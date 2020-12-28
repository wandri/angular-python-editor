import { async, TestBed } from '@angular/core/testing';
import {
  areAllBracketsClosed,
  buildSyntax,
  findAllPossibleOperations,
  findFocusFormulaIndexOnInput,
  findFormulasOnCaretPosition,
  INFINITE_ARGUMENTS,
  NO_CLOSING_BRACKET_INDEX,
  splitInputText
} from './input-utils';

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
        { index: [13, 16], operator: 'PI' },
        { index: [7, 17], operator: 'SUM' },
        { index: [0, 20], operator: 'SEARCH' }
      ];
      expect(findAllPossibleOperations('SEARCH(SUM(1,PI()),4)', ['SUM', 'SEARCH', 'PI'])).toEqual(expectedIndexes);
    });

    it('should detect complex closing bracket 2', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [0, 3], operator: 'PI' },
        { index: [23, 26], operator: 'PI' },
        { index: [17, 27], operator: 'SUM' },
        { index: [11, 28], operator: 'SUM' },
      ];
      expect(findAllPossibleOperations('PI() + 2 / SUM(1,SUM(4,PI())) - @M4', ['SUM', 'SEARCH', 'PI'])).toEqual(expectedIndexes);
    });

    it('should detect complex closing bracket 3', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [0, 11], operator: 'SUM' },
        { index: [15, 18], operator: 'PI' },
      ];
      expect(findAllPossibleOperations('SUM([1,4],6) + PI()', ['SUM', 'PI'])).toEqual(expectedIndexes);
    });

    it('should detect complex closing bracket 4', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [0, 11], operator: 'SUM' },
        { index: [15, 18], operator: 'PI' },
      ];
      expect(findAllPossibleOperations('SUM({1,4},6) + PI()', ['SUM', 'PI'])).toEqual(expectedIndexes);
    });

    it('should detect complex closing bracket 5', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [0, 11], operator: 'SUM' },
        { index: [15, 18], operator: 'PI' },
      ];
      expect(findAllPossibleOperations('SUM((1,4),6) + PI()', ['SUM', 'PI'])).toEqual(expectedIndexes);
    });

    it('should find the good formula focus from position', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI' },
        { index: [23, 27], operator: 'PI' },
        { index: [17, 28], operator: 'SUM' },
        { index: [11, 29], operator: 'SUM' },
      ];
      expect(findFormulasOnCaretPosition(2, indexes)).toEqual([{ index: [0, 4], operator: 'PI' }]);
    });

    it('should find no formula focus from position without formula', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI' },
        { index: [23, 27], operator: 'PI' },
        { index: [17, 28], operator: 'SUM' },
        { index: [11, 29], operator: 'SUM' },
      ];
      expect(findFormulasOnCaretPosition(5, indexes)).toEqual([]);
    });

    it('should find the formula inside another formula', () => {
      const indexes: { index: [number, number], operator: string }[] = [
        { index: [0, 4], operator: 'PI' },
        { index: [23, 27], operator: 'PI' },
        { index: [17, 28], operator: 'SUM' },
        { index: [11, 29], operator: 'SUM' },
      ];
      expect(findFormulasOnCaretPosition(22, indexes)).toEqual([{
        index: [17, 28],
        operator: 'SUM'
      }, {
        index: [11, 29],
        operator: 'SUM'
      }]);
    });
  });

  describe('Syntax build', () => {
    describe('simple syntax with focus on first argument', () => {
      let caretIndex;
      let syntax;
      let expectedSyntax;
      let syntaxParameter;
      beforeEach(() => {
        caretIndex = 4;
        syntax = 'SUM(var1,var2,var3)';
        syntaxParameter = [1, 1, 1];
        expectedSyntax = 'SUM(' + '<span class="focus-argument">' + 'var1' + '</span>' + ',var2,var3)';
      });

      it('should build syntax with closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 8],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
      it('should build syntax with non closing bracket 1', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
      it('should build syntax with non closing bracket 2', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        const inputContent = 'SUM(';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
      it('should build syntax with non closing bracket 8', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        const inputContent = 'SUM(test + 5';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
    });
    describe('simple syntax with focus on second argument', () => {
      let caretIndex;
      let syntax;
      let expectedSyntax;
      let syntaxParameter;
      beforeEach(() => {
        caretIndex = 6;
        syntax = 'SUM(var1,var2,var3)';
        syntaxParameter = [1, 1, 1];
        expectedSyntax = 'SUM(var1,' + '<span class="focus-argument">' + 'var2' + '</span>' + ',var3)';
      });

      it('should build syntax with closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 8],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });

      it('should build complex syntax with closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 14],
          operator: 'SUM'
        };
        caretIndex = 10;
        const inputContent = 'SUM([1,4],2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });

      it('should build syntax with non closing bracket 1', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
      it('should build syntax with non closing bracket 2', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        caretIndex = 10;
        const inputContent = 'SUM(1,2/900';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
    });
    describe('simple syntax with focus on last argument', () => {
      let caretIndex;
      let syntax;
      let expectedSyntax;
      let syntaxParameter;
      beforeEach(() => {
        caretIndex = 8;
        syntax = 'SUM(var1,var2,var3)';
        syntaxParameter = [1, 1, 1];
        expectedSyntax = 'SUM(var1,var2,' + '<span class="focus-argument">' + 'var3' + '</span>' + ')';
      });

      it('should build syntax with closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 8],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
      it('should build syntax with non closing bracket 1', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });

      it('should build syntax with non closing bracket 2', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        caretIndex = 11;
        const inputContent = 'SUM(1,2, 3+5';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
    });
    describe('complex syntax', () => {
      let caretIndex;
      let syntax;
      let expectedSyntax;
      let syntaxParameter;
      beforeEach(() => {
        caretIndex = 9;
        syntax = 'SUM(var1,[var2, ...])';
        syntaxParameter = [1, INFINITE_ARGUMENTS];
        expectedSyntax = 'SUM(var1,' + '<span class="focus-argument">' + '[var2, ...]' + '</span>' + ')';
      });

      it('should build syntax with closing bracket on second argument', () => {
        caretIndex = 7;
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 8],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });

      it('should build syntax with closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, 8],
          operator: 'SUM'
        };
        const inputContent = 'SUM(1,2,3)';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });

      it('should build syntax with non closing bracket', () => {
        const formula: { index: [number, number]; operator: string } = {
          index: [0, NO_CLOSING_BRACKET_INDEX],
          operator: 'SUM'
        };
        caretIndex = 11;
        const inputContent = 'SUM(1,2,3 ';
        expect(buildSyntax(formula, inputContent, caretIndex, syntax, syntaxParameter)).toEqual(expectedSyntax);
      });
    });
  });

  describe('focus formula index in input without non opened bracket', () => {
    let formula: { index: [number, number]; operator: string };
    let inputContent;
    beforeEach(() => {
      formula = {
        index: [4, NO_CLOSING_BRACKET_INDEX],
        operator: 'SUM'
      };
      inputContent = '2 + SUM(1,2,';
    });

    it('should find the focus on first argument 1', () => {
      const initialCaretIndex = 8;
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(0);
    });
    it('should find the focus on first argument 2', () => {
      const initialCaretIndex = 9;
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(0);
    });
    it('should find the focus on first argument 3', () => {
      const initialCaretIndex = 9;
      inputContent = '2 + SUM(1';
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(0);
    });
    it('should find the focus on first argument with nested Bracket', () => {
      const initialCaretIndex = 12;
      inputContent = '2 + SUM([1,2],2,';
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(0);
    });
    it('should find the focus on second argument', () => {
      const initialCaretIndex = 10;
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(1);
    });
    it('should find the focus on second argument with nested Bracket', () => {
      const initialCaretIndex = 14;
      inputContent = '2 + SUM([1,2],2,';
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(1);
    });
    it('should find the focus on last argument', () => {
      const initialCaretIndex = 12;
      expect(findFocusFormulaIndexOnInput(formula, inputContent, initialCaretIndex)).toEqual(2);
    });
  });
});
