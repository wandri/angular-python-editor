import {InputType} from './type.enum';

export interface SmartFormula {
  operator: string;
  type: InputType;
  value: string | number;
  id?: string;
  arguments: SmartFormula[] | null;
}
