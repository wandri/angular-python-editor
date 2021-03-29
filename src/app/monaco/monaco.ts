import { customLanguageDef } from './language';
import { customTheme } from './theme';
import { Store } from '../interfaces/store';
import { Formula } from '../interfaces/formula';
import { CompletionItemKind } from './completionItemKind';
import { CompletionItemInsertTextRule } from './completionItemInsertTextRule';
import { Variable } from '../interfaces/variable';
import { suggestionCustom } from './suggestions/suggestion-custom';
import { MonacoSuggestion } from './suggestions/monacoSuggestion';

export const customLanguageName = 'customLanguage';
export const customThemeName = 'customTheme';

function getVariableSuggestions(variableStore: Store<Variable>): MonacoSuggestion[] {
  return variableStore.ids.map(variableId => {
    const variable = variableStore.item[variableId];
    return {
      ...variable,
      label: variable.formattedLabel,
      kind: CompletionItemKind.Variable,
      insertText: variable.formattedLabel,
      description: 'Variable ' + variable.label,
      documentation: '',
      detail: `Variable "${variable.label}"`,
      insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
    };
  });
}

function getFormulaSuggestions(formulaStore: Store<Formula>): MonacoSuggestion[] {
  return formulaStore.ids.map(formulaId => {

    const formula = formulaStore.item[formulaId];
    return {
      ...formula,
      kind: CompletionItemKind.Function,
      insertText: formula.formattedLabel + '(',
      description: formula.description,
      documentation: formula.syntax,
      detail: formula.description,
      insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
    };
  });

}

function getSuggestions(variableStore: Store<Variable>, formulaStore: Store<Formula>): MonacoSuggestion[] {
  const variableSuggestions = getVariableSuggestions(variableStore);
  const formulaSuggestions = getFormulaSuggestions(formulaStore);
  return [
    ...suggestionCustom,
    ...variableSuggestions,
    ...formulaSuggestions
  ];
}


export function loadCustomMonaco(formulaStore: Store<Formula>, variableStore: Store<Variable>) {
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
      let suggestions = [];
      const wordUntilPosition = model.getWordUntilPosition(position);
      if (wordBeforePosition.word.trim() === '' || wordUntilPosition.word.trim() === '') {

        suggestions = getSuggestions(variableStore, formulaStore).map(item => ({
          ...item,
          range: {
            startLineNumber: position.lineNumber,
            startColumn: wordUntilPosition.startColumn,
            endLineNumber: position.lineNumber,
            endColumn: wordUntilPosition.endColumn - 1,
          },
        }));
      }
      return {suggestions};
    },
  });
}
