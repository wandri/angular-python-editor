export const NO_CLOSING_BRACKET_INDEX = 9999;

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
  return { beforeContent: contentBeforeFormula, afterContent: contentAfterFormula, focusContent: contentOnFormula };
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
  const closingBracketRegex = /(\w+\([\w,.\/+ *@\-]*\))/g;
  const nonClosingBracketRegex = /(\w*\([^(]*)$/g;
  let match: RegExpExecArray;
  let index = 0;
  while ((match = closingBracketRegex.exec(text)) !== null) {
    const matchingOperation = match[0];
    text = match.input.replace(matchingOperation, '@'.repeat(matchingOperation.length - Math.trunc(index / 10) - 1) + index);
    const operator = matchingOperation.split('(')[0];
    if (existingOperators.includes(operator)) {
      holder.push({
        index: [match.index, match.index + matchingOperation.length - 1],
        operator,
      });
    }
    index++;
    closingBracketRegex.lastIndex = 0;
  }
  while ((match = nonClosingBracketRegex.exec(text)) !== null) {
    const matchingOperation = match[0];
    text = match.input.replace(matchingOperation, '@'.repeat(matchingOperation.length - Math.trunc(index / 10) - 1) + index);
    const operatorName = matchingOperation.split('(')[0];
    if (existingOperators.includes(operatorName)) {
      holder.push({
        index: [match.index, NO_CLOSING_BRACKET_INDEX],
        operator: operatorName,
      });
    }
    index++;
    closingBracketRegex.lastIndex = 0;
  }
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
