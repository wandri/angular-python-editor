import { editorVariables } from './suggestion-variables';
import { editorFormulas } from './suggestion-formulas';
import { suggestionCustom } from './suggestion-custom';
import { CompletionItemKind } from '../completionItemKind';
import { CompletionItemInsertTextRule } from '../completionItemInsertTextRule';

export const completionTriggerKeywords = [
  {
    label: 'Test1',
    kind: CompletionItemKind.Constant,
    insertText: 'Test1',
    description: '1.1, 1.2, 1.3',
    insertTextRules: CompletionItemInsertTextRule.KeepWhitespace,
  },
  {
    label: 'Test2',
    kind: CompletionItemKind.Variable,
    insertText: 'Test2',
    description: '2.1',
  },
  {
    label: 'Test3',
    kind: CompletionItemKind.Field,
    insertText: 'Test3',
    description: '3.1, 3.2, 3.3',
  },
  {
    label: 'Test4',
    kind: CompletionItemKind.Value,
    insertText: 'Test4',
    description: '4.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  {
    label: 'Test5',
    kind: CompletionItemKind.Color,
    insertText: 'Test5',
    description: '5.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  {
    label: 'Test6',
    kind: CompletionItemKind.Property,
    insertText: 'Test6',
    description: '6.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  ...editorVariables.map(variable => ({
    ...variable,
    kind: CompletionItemKind.Variable,
    insertText: variable.label,
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  })),
  ...editorFormulas.map(variable => ({
    ...variable,
    kind: CompletionItemKind.Function,
    insertText: variable.label + '(',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  })),
  ...suggestionCustom,
];
