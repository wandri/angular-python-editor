import {InputType} from './type.enum';
import {Variable} from './variable';
import {Formula} from './formula';

export interface Suggestion {
  name: string;
  type: InputType;
  variable?: Variable;
  formula?: Formula;
}
