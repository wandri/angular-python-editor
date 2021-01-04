import { Store } from '../interfaces/store';
import { Formula } from '../interfaces/formula';
import { Variable } from '../interfaces/variable';
import { FlatFormula } from '../interfaces/flat-formula';

export const NO_CLOSING_BRACKET_INDEX = 9999;
export const INFINITE_ARGUMENTS = 1000;
export const OPENING_BRACKETS = ['(', '[', '{'];
export const CLOSING_BRACKETS = [')', ']', '}'];
export const QUOTES = [`'`, `"`];
export const SPECIAL_OPERATION = [`+`, `-`, `/`, `*`, `^`, `%`];

export function splitInputText(text: string, caretIndex: number):
  { focusContent: string; beforeContent: string, afterContent: string } {
  let contentBeforeFormula = '';
  let contentAfterFormula = '';
  let contentOnFormula = '';
  let characterPosition = 0;

  const specialCharacters = ['/', '*', '+', '(', ','];
  let content = '';
  const formattedContents = [];
  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    content += character;
    if (specialCharacters.includes(character)) {
      formattedContents.push(content);
      content = '';
    }
  }
  formattedContents.push(content);
  formattedContents.forEach(content => {
    const isBeforeFormula = characterPosition + content.length < caretIndex;
    const isOnFormulaPosition = characterPosition <= caretIndex && caretIndex <= characterPosition + content.length;
    if (isBeforeFormula) {
      contentBeforeFormula += content;
      characterPosition += content.length;
    } else if (isOnFormulaPosition) {
      contentOnFormula = content;
      characterPosition += 9999;
    } else {
      contentAfterFormula += content;
    }
  });
  return {
    beforeContent: contentBeforeFormula,
    afterContent: contentAfterFormula,
    focusContent: contentOnFormula
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
  for (let letter of text) {
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

export function parseInputToFlatFormulas(text: string, existingOperators: Store<Formula>, existingVariables: Store<Variable>): FlatFormula[] {
  const holder: FlatFormula[] = [];
  const bracketMemory: { firstIndex: number, operator: string, typeIndex: number }[] = [];
  const quotesMemory: { firstIndex: number, typeIndex: number }[] = [];
  let partialText = '';
  const regexNumber = /^\d*\.?\d+$/;
  for (let i = 0; i < text.length; i++) {
    let resetPartialText = false;
    let flatFormula: FlatFormula = null;
    const character: string = text[i];
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
          index: [lastQuote.firstIndex, i],
          operator: null,
          type: 'STRING',
          value: partialText,
        };
        quotesMemory.pop();
        resetPartialText = true;
      } else if (!lastQuote) {
        quotesMemory.push({
          firstIndex: i,
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
          firstIndex: i - partialText.length,
          operator: partialText,
          typeIndex: OPENING_BRACKETS.indexOf('(')
        });
        resetPartialText = true;
      }
    }
    if (CLOSING_BRACKETS.includes(character) && emptyQuoteMemory) {
      if (character === ')') {
        if (bracketMemory.length === 0) {
          throw new Error(`The bracket ")" at the position ${i + 1} is unnecessary`);
        }
        const lastOperator = bracketMemory[bracketMemory.length - 1].operator;
        if (!!lastOperator) {
          flatFormula = {
            index: [bracketMemory[bracketMemory.length - 1].firstIndex, i],
            operator: lastOperator,
            type: 'OPERATION',
            value: null,
          };
        }
        resetPartialText = true;
        bracketMemory.pop();
      }
    }
    if (SPECIAL_OPERATION.includes(character) && emptyQuoteMemory) {
      const isPowerOperatorWithDoubleStar = character === '*' && i !== text.length - 1 && text[i + 1] === '*';
      if (isPowerOperatorWithDoubleStar) {
        flatFormula = {
          index: [i, i + 1],
          operator: '**',
          type: 'OPERATION',
          value: null,
          argumentIndex: null,
        };
        i++;
      } else {
        flatFormula = {
          index: [i, i],
          operator: character,
          type: 'OPERATION',
          value: null,
          argumentIndex: null,
        };
      }
      resetPartialText = true;
    }

    if (resetPartialText) {
      if (partialText.match(regexNumber)) {
        holder.push({
          index: [i - partialText.length, i - 1],
          operator: null,
          type: 'NUMBER',
          value: Number.parseFloat(partialText),
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

  bracketMemory.forEach(formula => {
    if (!!formula.operator) {
      holder.push({
        index: [formula.firstIndex, NO_CLOSING_BRACKET_INDEX],
        operator: formula.operator,
        type: 'OPERATION',
        value: null,
      });
    }
  });
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
    } else if (CLOSING_BRACKETS.includes(character)
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

export function findFormulasOnCaretPosition(index: number, formulas: { index: [number, number], operator: string }[]): { index: [number, number], operator: string }[] {
  let result: { index: [number, number], operator: string }[] = [];
  formulas.forEach(formula => {
    const firstPosition = formula.index[0];
    if (firstPosition <= index && formula.index[1] >= index) {
      result.push(formula);
    }
  });
  result.sort((a, b) => a.index[0] > b.index[0] ? -1 : 1);
  return result;
}

export function findFocusFormulaIndexOnInput(formulaPosition: { index: [number, number]; operator: string }, inputText: string, initialCaretIndex: number) {
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
  let focusIndex = findFocusFormulaIndexOnInput(formulaPosition, inputText, initialCaretIndex);
  return getFormattedSyntax(syntax, syntaxParameter, formulaPosition, focusIndex);
}
