import { async, TestBed } from '@angular/core/testing';
import { splitInputText } from './input-utils';

describe('inputUtils', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({})
      .compileComponents();
  }));

  it('should split text between caret position', () => {
    const content = splitInputText('1 + SUM(MAT(RESEARCH(', 10);

    expect(content.beforeContent).toEqual('1 + SUM(');
    expect(content.afterContent).toEqual('RESEARCH(');
    expect(content.focusContent).toEqual('MAT(');
  });
});
