import { CompletionItemKind } from '../completionItemKind';
import { CompletionItemInsertTextRule } from '../completionItemInsertTextRule';
import { MonacoSuggestion } from './monacoSuggestion';

export const suggestionCustom: MonacoSuggestion[] = [
  {
    label: 'ifelse',
    kind: CompletionItemKind.Snippet,
    insertText: [
      'if (${1:condition}) {',
      '\t$0',
      '} else {',
      '\t',
      '}'
    ].join('\n'),
    description: 'If-Else Statement',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If-Else Statement',
    detail: 'If-Else Statement',
  }
];
