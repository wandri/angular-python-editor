export const NO_CLOSING_BRACKET_INDEX = 9999;
export const INFINITE_ARGUMENTS = 1000;
export const OPENING_BRACKETS = ['(', '[', '{'];
export const CLOSING_BRACKETS = [')', ']', '}'];

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
    } else if (CLOSING_BRACKETS.includes(character) && CLOSING_BRACKETS.indexOf(character) === memory[memory.length - 1].bracket) {
      operator = '';
      firstIndex = i + 1;
      const lastOperator = memory[memory.length - 1].operator;
      if (!!lastOperator) {
        holder.push({
          index: [memory[memory.length - 1].firstIndex, i],
          operator: memory[memory.length - 1].operator
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
    if (!!formula.operator) {
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
