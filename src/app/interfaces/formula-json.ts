export interface FormulaJson {
  operation: string;
  inputs: (number | string | FormulaJson)[];
}
