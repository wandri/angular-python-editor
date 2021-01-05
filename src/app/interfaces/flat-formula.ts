export interface FlatFormula {
  index: [number, number];
  operator: string;
  type: 'STRING' | 'NUMBER' | 'VARIABLE' | 'GROUP' | 'OPERATION' | 'CONDITION';
  value: string | number;
  id?: string;
  argumentIndex?: number;
}
