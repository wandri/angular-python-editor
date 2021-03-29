import { CompletionItemKind } from '../completionItemKind';
import { CompletionItemInsertTextRule } from '../completionItemInsertTextRule';

export const suggestionCustom = [
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
  }
];
