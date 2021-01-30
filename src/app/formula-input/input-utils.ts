import {Store} from '../interfaces/store';
import {Formula} from '../interfaces/formula';
import {Variable} from '../interfaces/variable';
import {FlatFormula} from '../interfaces/flat-formula';
import {InputType} from '../interfaces/type.enum';
import {ANode, IdentifierNode} from '../interfaces/acorn/acorn-node';
import {
  isBinaryOperation,
  isConditionalExpression,
  isExpressionStatement,
  isFunction,
  isNumberOrString,
  isProgram,
  isRegex,
  isUnary,
  isVariableOrFunctionIdentifier
} from '../interfaces/acorn/acorn-utils';

export const NO_CLOSING_BRACKET_INDEX = 9999;
export const INFINITE_ARGUMENTS = 1000;
export const OPENING_BRACKETS = ['(', '[', '{'];
export const CLOSING_BRACKETS = [')', ']', '}'];
export const QUOTES = [`'`, `"`];
export const BASIC_OPERATOR = [`+`, `-`, `/`, `*`, `^`, `%`];
export const EXTENDED_BASIC_OPERATOR = [`+`, `-`, `/`, `*`, `^`, `%`, '**'];
export const CONDITION_OPERATOR = [`=`, `!`, `<`, `>`];
export const EXTENDED_CONDITION_OPERATOR = [`=`, `!`, `<`, `>`, '<=', '>='];

export function splitInputText(text: string, caretIndex: number):
  { focusContent: string; beforeContent: string, afterContent: string } {
  let contentBeforeFocus = '';
  let contentAfterFocus = '';
  let contentOnFocus = '';
  let characterPosition = 0;

  const specialCharacters = [...BASIC_OPERATOR, ...CONDITION_OPERATOR, ' ', ','];
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
      if (OPENING_BRACKETS.includes(character)) {
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
      contentBeforeFocus += formattedContent;
      characterPosition += formattedContent.length;
    } else if (isOnFocusPosition) {
      contentOnFocus = formattedContent;
      characterPosition += 9999;
    } else {
      contentAfterFocus += formattedContent;
    }
  });
  return {
    beforeContent: contentBeforeFocus,
    afterContent: contentAfterFocus,
    focusContent: contentOnFocus
  };
}

export function suggestionNameWithSpaceBeforeIfExistent(name: string, firstCharacter: string): string {
  let formattedName = name;
  if (firstCharacter === ' ') {
    formattedName = ' ' + formattedName;
  }
  return formattedName;
}

export function areAllBracketsClosed(text): boolean {
  const holder = [];
  const openBrackets = ['(', '{', '['];
  const closedBrackets = [')', '}', ']'];
  for (const letter of text) {
    if (openBrackets.includes(letter)) {
      holder.push(letter);
    } else if (closedBrackets.includes(letter)) {
      const openPair = openBrackets[closedBrackets.indexOf(letter)];
      if (holder[holder.length - 1] === openPair) {
        holder.splice(-1, 1);
      } else {
        holder.push(letter);
        break;
      }
    }
  }
  return (holder.length === 0);
}

export function parseInputToFlatFormulas(text: string, existingOperators: Store<Formula>, existingVariables: Store<Variable>):
  FlatFormula[] {
  const holder: FlatFormula[] = [];
  const variables = {
    ...existingVariables,
    formattedNames: existingVariables.ids.map(name => name.replace(/[ ()/,*^%+-]/g, '_'))
  };
  const bracketMemory: { firstIndex: number, operator: string, typeIndex: number }[] = [];
  const quotesMemory: { firstIndex: number, typeIndex: number }[] = [];
  let partialText = '';
  const regexNumber = /^\d*\.?\d+$/;
  const textLength = text.length;
  for (let i = 0; i < textLength; i++) {
    let resetPartialText = false;
    let flatFormula: FlatFormula = null;
    const index = i;
    const character: string = text[index];
    const emptyQuoteMemory = quotesMemory.length === 0;

    if (character === ' ' && emptyQuoteMemory) {
      resetPartialText = true;
    }
    if (character === ',' && emptyQuoteMemory) {
      resetPartialText = true;
    }
    if (QUOTES.includes(character)) {
      const lastQuote = quotesMemory.length > 0 ? quotesMemory[quotesMemory.length - 1] : null;
      if (!!lastQuote && QUOTES.indexOf(character) === lastQuote.typeIndex) {
        flatFormula = {
          index: [lastQuote.firstIndex, index],
          operator: null,
          type: InputType.STRING,
          value: partialText,
        };
        quotesMemory.pop();
        resetPartialText = true;
      } else if (!lastQuote) {
        quotesMemory.push({
          firstIndex: index,
          typeIndex: QUOTES.indexOf(character),
        });
        resetPartialText = true;
      }
    }
    if (OPENING_BRACKETS.includes(character) && emptyQuoteMemory) {
      if (character === '(') {
        if (!!partialText && !existingOperators.ids.includes(partialText)) {
          throw new Error(`The formula "${partialText}" is not known`);
        }
        bracketMemory.push({
          firstIndex: index - partialText.length,
          operator: partialText,
          typeIndex: OPENING_BRACKETS.indexOf('(')
        });
        resetPartialText = true;
      }
    }
    if (CLOSING_BRACKETS.includes(character) && emptyQuoteMemory) {
      if (character === ')') {
        if (bracketMemory.length === 0) {
          throw new Error(`The bracket ")" at the position ${index + 1} is unnecessary`);
        }
        const lastOperator = bracketMemory[bracketMemory.length - 1].operator;
        if (!!lastOperator) {
          flatFormula = {
            index: [bracketMemory[bracketMemory.length - 1].firstIndex, index],
            operator: lastOperator,
            type: InputType.OPERATION,
            value: null,
          };
        } else {
          flatFormula = {
            index: [bracketMemory[bracketMemory.length - 1].firstIndex, index],
            operator: null,
            type: InputType.GROUP,
            value: null,
          };
        }
        resetPartialText = true;
        bracketMemory.pop();
      }
    }
    if (BASIC_OPERATOR.includes(character) && emptyQuoteMemory) {
      const isPowerOperatorWithDoubleStar = character === '*' && index !== textLength - 1 && text[index + 1] === '*';
      if (isPowerOperatorWithDoubleStar) {
        flatFormula = {
          index: [index, index + 1],
          operator: '**',
          type: InputType.OPERATION,
          value: null,
        };
        i++;
      } else {
        flatFormula = {
          index: [index, index],
          operator: character,
          type: InputType.OPERATION,
          value: null,
        };
      }
      resetPartialText = true;
    }
    if (CONDITION_OPERATOR.includes(character) && emptyQuoteMemory) {
      const isWithEqual = index !== textLength - 1 && text[index + 1] === '=';
      if (isWithEqual) {
        flatFormula = {
          index: [index, index + 1],
          operator: null,
          type: InputType.CONDITION,
          value: character + '=',
        };
        i++;
      } else {
        flatFormula = {
          index: [index, index],
          operator: null,
          type: InputType.CONDITION,
          value: character,
        };
      }
      resetPartialText = true;
    }

    if (resetPartialText) {
      if (partialText.match(regexNumber)) {
        holder.push({
          index: [index - partialText.length, index - 1],
          operator: null,
          type: InputType.NUMBER,
          value: Number.parseFloat(partialText),
        });
      }
      const variablePositionInName = variables.formattedNames.indexOf(partialText);
      if (variablePositionInName !== -1) {
        const variableName = variables.ids[variablePositionInName];
        holder.push({
          index: [index - partialText.length, index - 1],
          operator: null,
          type: InputType.VARIABLE,
          id: variables.item[variableName].id,
          value: variableName,
        });
      }
      if (!!flatFormula) {
        holder.push(flatFormula);
      }
      partialText = '';
    } else {
      partialText += character;
    }
  }

  if (partialText.match(regexNumber)) {
    holder.push({
      index: [textLength - partialText.length, textLength - 1],
      operator: null,
      type: InputType.NUMBER,
      value: Number.parseFloat(partialText),
    });
  }
  const variablePosition = variables.formattedNames.indexOf(partialText);
  if (variablePosition !== -1) {
    const variableName = variables.ids[variablePosition];
    holder.push({
      index: [textLength - partialText.length, textLength - 1],
      operator: null,
      type: InputType.VARIABLE,
      id: variables.item[variableName].id,
      value: variableName,
    });
  }

  for (let i = bracketMemory.length - 1; i >= 0; i--) {
    const formula = bracketMemory[i];
    if (!!formula.operator) {
      holder.push({
        index: [formula.firstIndex, NO_CLOSING_BRACKET_INDEX],
        operator: formula.operator,
        type: InputType.OPERATION,
        value: null,
      });
    } else {
      holder.push({
        index: [formula.firstIndex, NO_CLOSING_BRACKET_INDEX],
        operator: null,
        type: InputType.GROUP,
        value: null,
      });
    }
  }
  return holder;
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
  const result: { index: [number, number], operator: string }[] = [];
  formulas.forEach(formula => {
    const firstPosition = formula.index[0];
    if (firstPosition <= index && formula.index[1] >= index) {
      result.push(formula);
    }
  });
  result.sort((a, b) => a.index[0] > b.index[0] ? -1 : 1);
  return result;
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

export function buildSyntax(formulaPosition: { index: [number, number]; operator: string; }, inputText: string, initialCaretIndex: number,
                            syntax: string, syntaxParameter: number[]): string {
  const focusIndex = findFocusFormulaIndexOnInput(formulaPosition, inputText, initialCaretIndex);
  return getFormattedSyntax(syntax, syntaxParameter, formulaPosition, focusIndex);
}

export function syntaxErrorInFormula(node: ANode, formulas: Store<Formula>, variables: string[]): string {
  if (isProgram(node)) {
    return node.body.length > 0 && syntaxErrorInFormula(node.body[0], formulas, variables);
  } else if (isBinaryOperation(node)) {
    const leftSideSyntaxError = syntaxErrorInFormula(node.left, formulas, variables);
    if (leftSideSyntaxError) {
      return leftSideSyntaxError;
    }
    const rightSideSyntaxError = syntaxErrorInFormula(node.right, formulas, variables);
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
      .map(child => syntaxErrorInFormula(child, formulas, variables))
      .find(child => !!child);

  } else if (isVariableOrFunctionIdentifier(node)) {
    return variables.includes(node.name) ? null : `The variable "${node.name}" doesn't exit`;
  } else if (isUnary(node)) {
    return syntaxErrorInFormula(node.argument, formulas, variables);
  } else if (isExpressionStatement(node)) {
    return syntaxErrorInFormula(node.expression, formulas, variables);
  } else if (isConditionalExpression(node)) {
    return syntaxErrorInFormula(node.expression, formulas, variables);
  } else if (isNumberOrString(node)) {
  } else if (isRegex(node)) {
  }
  return null;
}
