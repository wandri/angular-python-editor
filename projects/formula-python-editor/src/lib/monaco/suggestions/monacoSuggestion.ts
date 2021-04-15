export interface MonacoSuggestion {
  label: string;
  kind: number;
  insertText: string;
  description: string;
  documentation: string;
  detail: string;
  insertTextRules: number;
}
