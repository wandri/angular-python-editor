import { async, TestBed } from '@angular/core/testing';
import {
  areAllBracketsClosed,
  buildSyntax,
  findAllPossibleOperations,
  findFocusFormulaIndexOnInput,
  findFormulasOnCaretPosition,
  INFINITE_ARGUMENTS,
  NO_CLOSING_BRACKET_INDEX,
  parseFlatFormulasToSmartFormula,
  parseInputToFlatFormulas,
  splitInputText
} from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { Formula } from '../interfaces/formula';
import { FlatFormula } from '../interfaces/flat-formula';
import { SmartFormula } from '../interfaces/smart-formula';

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

    it('should not detect non existent formula', () => {
      const expectedIndexes: { index: [number, number], operator: string }[] = [
        { index: [7, 17], operator: 'SUM' },
      ];
      expect(findAllPossibleOperations('SEARCH(SUM(1,PI()),4)', ['SUM'])).toEqual(expectedIndexes);
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
      it('should build syntax with non closing bracket 3', () => {
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

  describe('input parsing into formula', () => {
    let variables: Store<Variable>;
    let formulas: Store<Formula>;

    beforeEach(() => {
      variables = new Store<Variable>();
      formulas = new Store<Formula>();
      variables.addAllAndSort([
        { name: 'car 95/100%', id: '1', },
        { name: 'car 2', id: '2', },
        { name: 'Super car', id: '3' },
        { name: 'camping-car', id: '4' },
        { name: 'car', id: '5' },
      ]);
      formulas.addAllAndSort([
        {
          name: 'SUM',
          description: 'SUM details',
          syntax: 'SUM(var1,var2)',
          syntaxParameter: [1, 1],
          shortDescription: 'short Sum details'
        },
        {
          name: 'REPLACE',
          description: 'REPLACE details',
          syntax: 'REPLACE(text1,text2)',
          syntaxParameter: [1, 1, 1],
          shortDescription: 'short Replace details'
        },
        {
          name: 'PI',
          description: 'PI details',
          syntax: 'PI()',
          syntaxParameter: []
        },
      ]);
    });

    it('should parse string', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'STRING',
          operator: null,
          value: 'TEST',
          index: [0, 5],
        },
      ];
      expect(parseInputToFlatFormulas('"TEST"', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse formula with strings', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'STRING',
          operator: null,
          value: 'TEST ME',
          index: [8, 16],
        },
        {
          type: 'STRING',
          operator: null,
          value: 'ME',
          index: [18, 21],
        },
        {
          type: 'STRING',
          operator: null,
          value: 'YOU',
          index: [23, 27],
        },
        {
          type: 'OPERATION',
          operator: 'REPLACE',
          index: [0, 28],
          value: null,
        },
      ];
      expect(parseInputToFlatFormulas('REPLACE("TEST ME","ME","YOU")', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse formula with numbers', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 1,
          index: [4, 4],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 4,
          index: [6, 6],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 53,
          index: [8, 9],
        },
        {
          type: 'OPERATION',
          operator: 'SUM',
          index: [0, 10],
          value: null,
        },
      ];
      expect(parseInputToFlatFormulas('SUM(1,4,53)', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse simple operation with closed bracket', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 1,
          index: [1, 1],
        },
        {
          type: 'OPERATION',
          operator: '+',
          index: [2, 2],
          value: null,
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 2,
          index: [3, 3],
        },
        {
          type: 'GROUP',
          operator: null,
          value: null,
          index: [0, 4],
        },
        {
          type: 'OPERATION',
          operator: '*',
          index: [5, 5],
          value: null,
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 4,
          index: [6, 6],
        },
      ];
      expect(parseInputToFlatFormulas('(1+2)*4', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse simple operation with closed bracket', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 1,
          index: [1, 1],
        },
        {
          type: 'OPERATION',
          operator: '+',
          index: [2, 2],
          value: null,
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 2,
          index: [3, 3],
        },
        {
          type: 'GROUP',
          operator: null,
          value: null,
          index: [0, NO_CLOSING_BRACKET_INDEX],
        },
      ];
      expect(parseInputToFlatFormulas('(1+2', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse classic operations', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 1,
          index: [0, 0],
        },
        {
          type: 'OPERATION',
          operator: '+',
          value: null,
          index: [2, 2],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 2,
          index: [4, 4],
        },
        {
          type: 'OPERATION',
          operator: '^',
          value: null,
          index: [5, 5],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 3,
          index: [6, 6],
        },
        {
          type: 'OPERATION',
          operator: '-',
          value: null,
          index: [8, 8],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 4,
          index: [10, 10],
        },
        {
          type: 'OPERATION',
          operator: '*',
          value: null,
          index: [11, 11],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 90,
          index: [12, 13],
        },
        {
          type: 'OPERATION',
          operator: '/',
          value: null,
          index: [14, 14],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 9,
          index: [15, 15],
        },
        {
          type: 'OPERATION',
          operator: '**',
          value: null,
          index: [16, 17],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 64,
          index: [18, 19],
        },
      ];
      expect(parseInputToFlatFormulas('1 + 2^3 - 4*90/9**64', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse formula with classic operation', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 1,
          index: [4, 4],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 6,
          index: [6, 6],
        },
        {
          type: 'OPERATION',
          operator: '%',
          value: null,
          index: [7, 7],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 3,
          index: [8, 8],
        },
        {
          type: 'OPERATION',
          operator: 'SUM',
          value: null,
          index: [0, 9],
        },
      ];
      expect(parseInputToFlatFormulas('SUM(1,6%3)', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse formula with opened bracket', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'OPERATION',
          operator: 'PI',
          value: null,
          index: [4, 7],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 2,
          index: [13, 13],
        },
        {
          type: 'OPERATION',
          operator: 'SUM',
          value: null,
          index: [9, NO_CLOSING_BRACKET_INDEX],
        },
        {
          type: 'OPERATION',
          operator: 'SUM',
          value: null,
          index: [0, NO_CLOSING_BRACKET_INDEX],
        },
      ];
      expect(parseInputToFlatFormulas('SUM(PI(),SUM(2', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse simple variable', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'VARIABLE',
          operator: null,
          value: 'car 2',
          id: '2',
          index: [0, 4],
        },
      ];
      expect(parseInputToFlatFormulas('car_2', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse variables with simple operation', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'VARIABLE',
          operator: null,
          value: 'car 2',
          id: '2',
          index: [0, 4],
        },
        {
          type: 'OPERATION',
          operator: '+',
          value: null,
          index: [6, 6],
        },
        {
          type: 'VARIABLE',
          operator: null,
          value: 'camping-car',
          id: '4',
          index: [8, 18],
        },
        {
          type: 'OPERATION',
          operator: '-',
          value: null,
          index: [20, 20],
        },
        {
          type: 'VARIABLE',
          operator: null,
          value: 'car 95/100%',
          id: '1',
          index: [22, 32],
        },
      ];
      expect(parseInputToFlatFormulas('car_2 + camping_car - car_95_100_', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse condition with variable and number', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'VARIABLE',
          operator: null,
          value: 'car 2',
          id: '2',
          index: [0, 4],
        },
        {
          type: 'CONDITION',
          operator: null,
          value: '<=',
          index: [6, 7],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 5,
          index: [9, 9],
        },
      ];
      expect(parseInputToFlatFormulas('car_2 <= 5', formulas, variables)).toEqual(expectedFormulas);
    });

    it('should parse condition with numbers', () => {
      const expectedFormulas: FlatFormula[] = [
        {
          type: 'NUMBER',
          operator: null,
          value: 4,
          index: [0, 0],
        },
        {
          type: 'CONDITION',
          operator: null,
          value: '<',
          index: [1, 1],
        },
        {
          type: 'NUMBER',
          operator: null,
          value: 5,
          index: [2, 2],
        },
      ];
      expect(parseInputToFlatFormulas('4<5', formulas, variables)).toEqual(expectedFormulas);
    });
  });

  describe('FlatFormula parsing to SmartFormula', () => {
    it('should parse simple flat formula', () => {
      const expectedParsing: SmartFormula = {
        type: 'OPERATION',
        operator: 'REPLACE',
        value: null,
        arguments: [
          {
            type: 'STRING',
            operator: null,
            value: 'TEST ME',
            arguments: null
          },
          {
            type: 'STRING',
            operator: null,
            value: 'ME',
            arguments: null
          },
          {
            type: 'STRING',
            operator: null,
            value: 'YOU',
            arguments: null
          },
        ]
      };
      const flatFormula: FlatFormula[] = [
        {
          type: 'STRING',
          operator: null,
          value: 'TEST ME',
          index: [8, 16],
        },
        {
          type: 'STRING',
          operator: null,
          value: 'ME',
          index: [18, 21],
        },
        {
          type: 'STRING',
          operator: null,
          value: 'YOU',
          index: [23, 27],
        },
        {
          type: 'OPERATION',
          operator: 'REPLACE',
          index: [0, 28],
          value: null,
        },
      ];
      expect(parseFlatFormulasToSmartFormula(flatFormula)).toEqual(expectedParsing);
    });
  });
});
