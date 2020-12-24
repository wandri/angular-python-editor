export function splitInputText(text: string, caretIndex: number):
  { focusContent: string; beforeContent: string, afterContent: string } {
  let contentBeforeFormula = '';
  let contentAfterFormula = '';
  let contentOnFormula = '';
  let characterPosition = 0;

  const specialCharacters = ['/', '*', '+', '('];
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
