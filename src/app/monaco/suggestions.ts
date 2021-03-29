export enum CompletionItemKind {
  Method = 0,
  Function = 1,
  Constructor = 2,
  Field = 3,
  Variable = 4,
  Class = 5,
  Struct = 6,
  Interface = 7,
  Module = 8,
  Property = 9,
  Event = 10,
  Operator = 11,
  Unit = 12,
  Value = 13,
  Constant = 14,
  Enum = 15,
  EnumMember = 16,
  Keyword = 17,
  Text = 18,
  Color = 19,
  File = 20,
  Reference = 21,
  Customcolor = 22,
  Folder = 23,
  TypeParameter = 24,
  User = 25,
  Issue = 26,
  Snippet = 27
}

export enum CompletionItemInsertTextRule {
  /**
   * Adjust whitespace/indentation of multiline insert texts to
   * match the current line indentation.
   */
  KeepWhitespace = 1,
  /**
   * `insertText` is a snippet.
   */
  InsertAsSnippet = 4
}

export const completionTriggerKeywords = [
  {
    label: 'Test1',
    kind: CompletionItemKind.Constant,
    insertText: 'Test1',
    description: '1.1, 1.2, 1.3',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  {
    label: 'Test2',
    kind: CompletionItemKind.Variable,
    insertText: 'Test2',
    description: '2.1',
  },
  {
    label: 'Test3',
    kind: CompletionItemKind.Function,
    insertText: 'Test3',
    description: '3.1, 3.2, 3.3',
  },
  {
    label: 'Test4',
    kind: CompletionItemKind.Function,
    insertText: 'Test4',
    description: '4.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  {
    label: 'Test5',
    kind: CompletionItemKind.Function,
    insertText: 'Test5',
    description: '5.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
  {
    label: 'Test6',
    kind: CompletionItemKind.Function,
    insertText: 'Test6',
    description: '6.1',
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
  },
];
