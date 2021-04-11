import { customLanguageDef } from './language';
import { customTheme } from './theme';
import { completionTriggerKeywords } from './suggestions/suggestions';

export const customLanguageName = 'customLanguage';
export const customThemeName = 'customTheme';

export function loadCustomMonaco() {
  (window as any).monaco.languages.register({id: customLanguageName});

  // Register a tokens provider for the language
  (window as any).monaco.languages.setMonarchTokensProvider(customLanguageName, customLanguageDef);

  (window as any).monaco.editor.defineTheme(customThemeName, customTheme);

  (window as any).monaco.languages.registerCompletionItemProvider(customLanguageName, {
    provideCompletionItems: (model, position) => {
      const wordBeforePosition = model.getWordUntilPosition({
        lineNumber: position.lineNumber,
        column: position.column - 1,
      });

      const wordUntilPosition = model.getWordUntilPosition(position);
      if (wordBeforePosition.word.trim() === '' || wordUntilPosition.word.trim() === '') {
        const suggestions = completionTriggerKeywords.map(item => ({
          label: item.label,
          kind: item.kind,
          description: item.description,
          documentation: item.description,
          insertText: item.insertText,
          detail: item.description,
          insertTextRules: item.insertTextRules,
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
