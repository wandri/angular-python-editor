import { customLanguageDef } from './language';
import { customTheme } from './theme';
import { completionTriggerKeywords } from './suggestions';

export const customLanguage = 'customLanguage';

export function loadCustomMonaco() {
  (window as any).monaco.languages.register({id: customLanguage});

  // Register a tokens provider for the language
  (window as any).monaco.languages.setMonarchTokensProvider(customLanguage, customLanguageDef);

  // [comment] [string] [keyword] [number] [regexp] [operator] [namespace]
  //   [type] [struct] [class] [interface] [enum] [typeParameter] [function]
  //   [member] [macro] [variable] [parameter] [property] [label]
  (window as any).monaco.editor.defineTheme('customTheme', customTheme);

  (window as any).monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const wordBeforePosition = model.getWordUntilPosition({
        lineNumber: position.lineNumber,
        column: position.column - 1,
      });

      const wordUntilPosition = model.getWordUntilPosition(position);
      if (wordBeforePosition.word.trim() === '' || wordUntilPosition.word.trim() === '') {
        const suggestions = completionTriggerKeywords.map(id => ({
          label: id.label,
          kind: id.kind,
          description: id.description,
          documentation: id.description,
          insertText: id.insertText,
          detail: id.description,
          insertTextRules: id.insertTextRules,
          range: {
            startLineNumber: position.lineNumber,
            startColumn: wordUntilPosition.startColumn,
            endLineNumber: position.lineNumber,
            endColumn: wordUntilPosition.endColumn - 1,
          },
        }));
        return {suggestions};
      }
    },
  });
}
