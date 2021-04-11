import { Store } from '../interfaces/store';
import { Formula } from '../interfaces/formula';
import { ANode, IdentifierNode } from '../interfaces/acorn/acorn-node';
import {
  isBlock,
  isConditionalExpression,
  isExpressionStatement,
  isFunction,
  isIfStatement,
  isLogicalOperation,
  isNumberOrString,
  isProgram,
  isRegex,
  isReturnStatement,
  isUnary,
  isVariableOrFunctionIdentifier
} from '../interfaces/acorn/acorn-utils';
import { AcornType } from '../interfaces/acorn/acorn-type';

export const NO_CLOSING_BRACKET_INDEX = 9999;
export const INFINITE_ARGUMENTS = 1000;
export const OPENING_BRACKETS = ['(', '[', '{'];
export const CLOSING_BRACKETS = [')', ']', '}'];
export const BASIC_OPERATOR = [`+`, `-`, `/`, `*`, `^`, `%`];
export const CONDITION_OPERATOR = [`=`, `!`, `<`, `>`];

export function getContentAroundCaret(text: string, caretIndex: number):
  { focusContent: string; beforeContent: string, afterContent: string } {
  let contentBeforeCaret = '';
  let contentAfterCaret = '';
  let contentOnCaret = '';
  let characterPosition = 0;

  const specialCharacters = [...BASIC_OPERATOR, ...CONDITION_OPERATOR, ' ', ',', ')'];
  let content = '';
  const formattedContents = [];
  for (const character of text) {
    if (specialCharacters.includes(character)) {
      if (!!content) {
        formattedContents.push(content);
      }
      formattedContents.push(character);
      content = '';
    } else {
      content += character;
      if ([...OPENING_BRACKETS].includes(character)) {
        formattedContents.push(content);
        content = '';
      }
    }
  }
  formattedContents.push(content);
  formattedContents.forEach(formattedContent => {
    const isBeforeFocus = characterPosition + formattedContent.length < caretIndex;
    const isOnFocusPosition = characterPosition <= caretIndex && caretIndex <= characterPosition + formattedContent.length;
    if (isBeforeFocus) {
      contentBeforeCaret += formattedContent;
      characterPosition += formattedContent.length;
    } else if (isOnFocusPosition) {
      contentOnCaret = formattedContent;
      characterPosition += 9999;
    } else {
      contentAfterCaret += formattedContent;
    }
  });
  return {
    beforeContent: contentBeforeCaret,
    afterContent: contentAfterCaret,
    focusContent: contentOnCaret
  };
}

export function suggestionNameWithSpaceBeforeIfExistent(name: string, firstCharacter: string): string {
  let formattedName = name;
  if (firstCharacter === ' ') {
    formattedName = ' ' + formattedName;
  }
  return formattedName;
}

export function findAllPossibleOperations(text: string, existingOperators: string[]): { index: [number, number], operator: string }[] {
  const holder: { index: [number, number], operator: string }[] = [];
  const memory: { firstIndex: number, operator: string, bracket: number }[] = [];
  let firstIndex = 0;
  let operator = '';
  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    if (OPENING_BRACKETS.includes(character)) {
      memory.push({
        firstIndex,
        operator,
        bracket: OPENING_BRACKETS.indexOf(character)
      });
      operator = '';
      firstIndex = i + 1;
    } else if (CLOSING_BRACKETS.includes(character) && memory.length > 0
      && CLOSING_BRACKETS.indexOf(character) === memory[memory.length - 1].bracket) {
      operator = '';
      firstIndex = i + 1;
      const lastOperator = memory[memory.length - 1].operator;
      if (!!lastOperator && existingOperators.includes(lastOperator)) {
        holder.push({
          index: [memory[memory.length - 1].firstIndex, i],
          operator: lastOperator
        });
      }
      memory.pop();
    } else if (!!character.match(/\w/g)) {
      operator += character;
      if (operator.length === 0) {
        firstIndex = i;
      }
    } else {
      operator = '';
      firstIndex = i + 1;
    }
  }
  memory.forEach(formula => {
    if (!!formula.operator && existingOperators.includes(formula.operator)) {
      holder.push({
        index: [formula.firstIndex, NO_CLOSING_BRACKET_INDEX],
        operator: formula.operator
      });
    }
  });
  return holder;
}

export function findFormulasOnCaretPosition(index: number, formulas: { index: [number, number], operator: string }[]):
  { index: [number, number], operator: string }[] {
  const results: { index: [number, number], operator: string }[] = [];
  formulas.forEach(formula => {
    const firstPosition = formula.index[0];
    const indexAfterFirstFormulaCharacter = firstPosition + 1 <= index;
    if (indexAfterFirstFormulaCharacter && formula.index[1] >= index) {
      results.push(formula);
    }
  });
  results.sort((a, b) => a.index[0] > b.index[0] ? -1 : 1);
  return results;
}

export function findFirstFormulasOnCaretPosition(index: number, formulas: { index: [number, number], operator: string }[]):
  { index: [number, number], operator: string } {
  const formulasOnCaretPosition = findFormulasOnCaretPosition(index, formulas);
  return formulasOnCaretPosition.length > 0 && formulasOnCaretPosition[0];
}

export function findFocusFormulaIndexOnInput(formulaPosition: { index: [number, number]; operator: string },
                                             inputText: string, initialCaretIndex: number) {
  const startArgumentIndex = formulaPosition.index[0];
  const argumentsStartIndex = startArgumentIndex + formulaPosition.operator.length + 1;
  const formulaWithArguments = inputText
    .slice(argumentsStartIndex, formulaPosition.index[1] + 1);
  let focusIndex = 0;
  const memory = [];

  for (let i = 0; i < formulaWithArguments.length; i++) {
    const character = formulaWithArguments[i];
    if (OPENING_BRACKETS.includes(character)) {
      memory.push(OPENING_BRACKETS.indexOf(character));
    }
    if (CLOSING_BRACKETS.includes(character) && CLOSING_BRACKETS.indexOf(character) === memory[memory.length - 1]) {
      memory.pop();
    }
    if (argumentsStartIndex + i === initialCaretIndex) {
      break;
    }
    if (character === ',' && memory.length === 0) {
      focusIndex++;
    }
  }
  return focusIndex;
}

function getFormattedSyntax(syntax: string, syntaxParameter: number[],
                            formulaPosition: { index: [number, number]; operator: string },
                            focusIndex: number): string {
  let formattedSyntax = syntax;
  let partialText = '';
  const memory = [];
  let argumentFormulaIndex = 0;
  for (let i = formulaPosition.operator.length + 1; i < syntax.length; i++) {
    const character = syntax[i];
    if (OPENING_BRACKETS.includes(character)) {
      memory.push(OPENING_BRACKETS.indexOf(character));
    }
    if (CLOSING_BRACKETS.includes(character) && CLOSING_BRACKETS.indexOf(character) === memory[memory.length - 1]) {
      memory.pop();
    }
    if ((character === ',' || i === syntax.length - 1) && memory.length === 0) {
      const parameterNumbers = syntaxParameter.length;
      const isOnInfiniteParameter = argumentFormulaIndex >= parameterNumbers - 1
        && syntaxParameter[parameterNumbers - 1] === INFINITE_ARGUMENTS;
      if (argumentFormulaIndex === focusIndex || isOnInfiniteParameter) {
        formattedSyntax = formattedSyntax.replace(partialText, '<span class="focus-argument">' + partialText + '</span>');
        break;
      } else {
        partialText = '';
      }
      argumentFormulaIndex++;
    } else {
      partialText += character;
    }
  }
  return formattedSyntax;
}

export function buildSyntax(formulaPosition: { index: [number, number]; operator: string; },
                            inputText: string,
                            initialCaretIndex: number,
                            syntax: string,
                            syntaxParameter: number[]): string {
  const focusIndex = findFocusFormulaIndexOnInput(formulaPosition, inputText, initialCaretIndex);
  return getFormattedSyntax(syntax, syntaxParameter, formulaPosition, focusIndex);
}

export function syntaxErrorInFormula(node: ANode, formulas: Store<Formula>, formattedVariables: string[]): string {
  if (!Object.values(AcornType).includes(node.type)) {
    return `The operation ${node.type} is not implemented`;
  } else if (isProgram(node)) {
    return node.body.length > 0 && syntaxErrorInFormula(node.body[0].body, formulas, formattedVariables);
  } else if (isLogicalOperation(node)) {
    const leftSideSyntaxError = syntaxErrorInFormula(node.left, formulas, formattedVariables);
    if (leftSideSyntaxError) {
      return leftSideSyntaxError;
    }
    const rightSideSyntaxError = syntaxErrorInFormula(node.right, formulas, formattedVariables);
    if (rightSideSyntaxError) {
      return rightSideSyntaxError;
    }
  } else if (isFunction(node)) {
    const calleeNode: IdentifierNode = node.callee;
    const functionName = calleeNode.name;
    if (!formulas.ids.includes(functionName)) {
      return `The formula "${functionName}" doesn't exit`;
    }
    let argumentNumber = node.arguments.length;
    let isInfiniteArgumentsOrLimitedOptional = false;
    for (let i = 0; i < formulas.item[functionName].syntaxParameter.length; i++) {
      const argumentType = formulas.item[functionName].syntaxParameter[i];
      if (argumentType === 1000) {
        isInfiniteArgumentsOrLimitedOptional = true;
        break;
      }
      if (argumentType === 0 && i === node.arguments.length) {
        isInfiniteArgumentsOrLimitedOptional = true;
        break;
      } else if (argumentType === 1 || argumentType === 0) {
        argumentNumber--;
        if (argumentNumber < 0) {
          return `The formula "${functionName}" has missing arguments`;
        }
      }
    }
    if (!isInfiniteArgumentsOrLimitedOptional && argumentNumber > 0) {
      return `The formula "${functionName}" has too many arguments`;
    }
    return node.arguments
      .map(child => syntaxErrorInFormula(child, formulas, formattedVariables))
      .find(child => !!child);
  } else if (isVariableOrFunctionIdentifier(node)) {
    return formattedVariables.includes(node.name) ? null : `The variable "${node.name}" doesn't exit`;
  } else if (isUnary(node)) {
    return syntaxErrorInFormula(node.argument, formulas, formattedVariables);
  } else if (isExpressionStatement(node)) {
    return syntaxErrorInFormula(node.expression, formulas, formattedVariables);
  } else if (isConditionalExpression(node)) {
    return syntaxErrorInFormula(node.expression, formulas, formattedVariables);
  } else if (isBlock(node)) {
    return node.body
      .map(child => syntaxErrorInFormula(child, formulas, formattedVariables))
      .find(child => !!child);
  } else if (isReturnStatement(node)) {
    return syntaxErrorInFormula(node.argument, formulas, formattedVariables);
  } else if (isIfStatement(node)) {
    const testCheck = syntaxErrorInFormula(node.test, formulas, formattedVariables);
    if (!!testCheck) {
      return testCheck;
    }
    const consequentCheck = syntaxErrorInFormula(node.consequent, formulas, formattedVariables);
    if (!!consequentCheck) {
      return consequentCheck;
    }
    if (node.alternate) {
      const alternateCheck = syntaxErrorInFormula(node.alternate, formulas, formattedVariables);
      if (!!alternateCheck) {
        return alternateCheck;
      }
    }
  } else if (isNumberOrString(node)) {
  } else if (isRegex(node)) {
  }
  return null;
}

export function formatAcornError(error): string {
  error = error.replace('SyntaxError: ', '');
  const match: RegExpMatchArray = error.match(new RegExp(/\(1:(\d+)\)/)) || [];
  error = error.replace(match[0], '');
  return error;
}

export function isBracketMissing(innerText: string): boolean {
  const quoteMemory: { type: 'single' | 'double' }[] = [];
  let openBracket = 0;
  for (const character of innerText) {
    if (character === `"`) {
      if (quoteMemory.length > 0 && quoteMemory[quoteMemory.length - 1].type === 'double') {
        quoteMemory.pop();
      } else {
        quoteMemory.push({type: 'double'});
      }
    } else if (character === `'`) {
      if (quoteMemory.length > 0 && quoteMemory[quoteMemory.length - 1].type === 'single') {
        quoteMemory.pop();
      } else {
        quoteMemory.push({type: 'single'});
      }
    } else if (quoteMemory.length === 0 && character === '(') {
      openBracket++;
    } else if (quoteMemory.length === 0 && character === ')') {
      if (openBracket <= 0) {
        return true;
      } else {
        openBracket--;
      }
    }
  }
  return openBracket !== 0;
}
