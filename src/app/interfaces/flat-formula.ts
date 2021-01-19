import {InputType} from './type.enum';

export interface FlatFormula {
  index: [number, number];
  operator: string;
  type: InputType;
  value: string | number;
  id?: string;
  argumentIndex?: number;
}
