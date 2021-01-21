import {AcornPosition} from './acorn-position';

export interface AcornSourceLocation {
  start: AcornPosition;
  end: AcornPosition;
  source?: string | null;
}
