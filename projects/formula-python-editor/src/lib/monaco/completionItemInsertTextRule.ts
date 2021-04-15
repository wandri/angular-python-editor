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
