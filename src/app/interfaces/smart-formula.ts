export interface SmartFormula {
  operator: string;
  type: 'STRING' | 'NUMBER' | 'VARIABLE' | 'GROUP' | 'OPERATION' | 'CONDITION';
  value: string | number;
  id?: string;
  arguments: SmartFormula[] | null;
}
