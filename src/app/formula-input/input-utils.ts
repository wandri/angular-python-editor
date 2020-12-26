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

export function findClosingOperationIndexes(text: string): { index: [number, number], operator: string }[] {
  const holder: { index: [number, number], operator: string }[] = [];
  const regex = /(\w+\([\w,.\/+ *@\-]*\))/g;
  let match: RegExpExecArray;
  let index = 0;
  while ((match = regex.exec(text)) !== null) {
    const matchingOperation = match[0];
    text = match.input.replace(matchingOperation, '@'.repeat(matchingOperation.length - Math.trunc(index / 10) - 1) + index);
    holder.push({
      index: [match.index, match.index + matchingOperation.length],
      operator: matchingOperation.split('(')[0]
    });
    index++;
    regex.lastIndex = 0;
  }
  return holder;
}

export function findFormulaFromFormulaIndexes(index: number, formulas: { index: [number, number], operator: string }[]): { index: [number, number], operator: string }[] {
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
