import { async, TestBed } from '@angular/core/testing';
import { areAllBracketsClosed, findAllPossibleOperations, findFormulasOnCaretPosition, splitInputText } from './input-utils';

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

  describe('Detection of not closing bracket', () => {
    it('should detect complex closing bracket 1', () => {
      expect(areAllBracketsClosed('{[(3+1)+2]+}')).toBeTruthy();
    });
    it('should detect complex closing bracket 2', () => {
      expect(areAllBracketsClosed('[([1+1]+(2*2)-{3/3})]')).toBeTruthy();
    });
    it('should detect simple NON closing bracket', () => {
      expect(areAllBracketsClosed('(3+{1-1)}')).toBeFalsy();
    });
    it('should detect complex NON closing bracket', () => {
      expect(areAllBracketsClosed('(({[(((1)-2)+3)-3]/3}-3)')).toBeFalsy();
    });
  });

  describe('Index of operation', () => {
    it('should detect complex closing bracket 1', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [13, 16], operator: 'PI', },
        { index: [7, 17], operator: 'SUM', },
        { index: [0, 20], operator: 'SEARCH', }
      ];
      expect(findAllPossibleOperations('SEARCH(SUM(1,PI()),4)', ['SUM', 'SEARCH', 'PI'])).toEqual(expectedIndexes);
    });

    it('should detect complex closing bracket 2', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [0, 3], operator: 'PI', },
        { index: [23, 26], operator: 'PI', },
        { index: [17, 27], operator: 'SUM', },
        { index: [11, 28], operator: 'SUM', },
      ];
      expect(findAllPossibleOperations('PI() + 2 / SUM(1,SUM(4,PI())) - @M4', ['SUM', 'SEARCH', 'PI'])).toEqual(expectedIndexes);
    });

    it('should find the good formula focus from position', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI', },
        { index: [23, 27], operator: 'PI', },
        { index: [17, 28], operator: 'SUM', },
        { index: [11, 29], operator: 'SUM', },
      ];
      expect(findFormulasOnCaretPosition(2, indexes)).toEqual([{ index: [0, 4], operator: 'PI', }]);
    });

    it('should find no formula focus from position without formula', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI', },
        { index: [23, 27], operator: 'PI', },
        { index: [17, 28], operator: 'SUM', },
        { index: [11, 29], operator: 'SUM', },
      ];
      expect(findFormulasOnCaretPosition(5, indexes)).toEqual([]);
    });

    it('should find the formula inside another formula', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI', },
        { index: [23, 27], operator: 'PI', },
        { index: [17, 28], operator: 'SUM', },
        { index: [11, 29], operator: 'SUM', },
      ];
      expect(findFormulasOnCaretPosition(22, indexes)).toEqual([{ index: [17, 28], operator: 'SUM' }, {
        index: [11, 29],
        operator: 'SUM'
      }]);
    });
  });
});
