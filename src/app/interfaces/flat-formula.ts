export interface FlatFormula {
  index: [number, number];
  operator: string;
  type: 'STRING' | 'NUMBER' | 'VARIABLE' | 'OPERATION';
  value: string | number;
  argumentIndex?: number;
}
