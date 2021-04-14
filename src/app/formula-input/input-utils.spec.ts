import { TestBed, waitForAsync } from '@angular/core/testing';
import { formatAcornError, isBracketMissing, syntaxErrorInFormula } from './input-utils';
import { Store } from '../interfaces/store';
import { Formula } from '../interfaces/formula';
import {
  AcornNode,
  BinaryOperationNode,
  FunctionNode,
  IdentifierNode,
  PotentialNode,
  StringOrNumberNode
} from '../interfaces/acorn/acorn-node';
import { AcornType } from '../interfaces/acorn/acorn-type';

describe('inputUtils', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({})
      .compileComponents();
  }));

  describe(`Check full formula syntax - function "${syntaxErrorInFormula.name}"`, () => {
    const existingFormulaNameWithInfiniteArguments = 'OPERATION_WITH_INFINITE';
    const existingFormulaNameWith2Arguments = 'OPERATION_WITH_FIX';
    const existingFormulaNameWithOptionalArguments = 'OPERATION_WITH_OPTIONAL';
    const existingFormulaNameWithComplexArguments = 'OPERATION_WITH_COMPLEX';
    const existingFormulaNameWithNoArguments = 'OPERATION_NO_ARGUMENTS';
    const existingVariableName = 'existing variable';
    const notExistingVariableName = 'not existing variable';
    let formulas: Store<Formula>;

    beforeEach(() => {
      formulas = new Store<Formula>();
      formulas.addWithFormattingAndSorting([
        {
          label: existingFormulaNameWithInfiniteArguments,
          description: '',
          syntax: '',
          syntaxParameter: [1, 1000],
        },
        {
          label: existingFormulaNameWith2Arguments,
          description: '',
          syntax: '',
          syntaxParameter: [1, 1],
        },
        {
          label: existingFormulaNameWithOptionalArguments,
          description: '',
          syntax: '',
          syntaxParameter: [1, 1, 0],
        },
        {
          label: existingFormulaNameWithComplexArguments,
          description: '',
          syntax: '',
          syntaxParameter: [1, 0, 1],
        },
        {
          label: existingFormulaNameWithNoArguments,
          description: '',
          syntax: '',
          syntaxParameter: [],
        },
      ]);
    });

    describe('with function', () => {
      let argument1: StringOrNumberNode;

      beforeEach(() => {
        argument1 = {
          value: 'test 1',
          raw: 'test 1',
          type: AcornType.Literal,
        };
      });

      it('should send an error when operation does not exist', () => {
        const notExistingFunctionName = 'not existing function';
        const functionNode: FunctionNode = {
          type: AcornType.CallExpression,
          arguments: [argument1, argument1],
          callee: {
            name: notExistingFunctionName,
            type: AcornType.Identifier,
          }
        };
        expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
          .toEqual(`The formula "${notExistingFunctionName}" doesn't exit`);
      });

      it('should send no error when operation name exists', () => {
        const functionNode: FunctionNode = {
          type: AcornType.CallExpression,
          arguments: [argument1, argument1],
          callee: {
            name: existingFormulaNameWithInfiniteArguments,
            type: AcornType.Identifier,
          }
        };
        expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
          .toBeUndefined();
      });

      describe('Fix Arguments', () => {
        it('should send an error when arguments are missing 1', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [],
            callee: {
              name: existingFormulaNameWith2Arguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toEqual(`The formula "${existingFormulaNameWith2Arguments}" has missing arguments`);
        });
        it('should send an error when arguments are missing 2', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1],
            callee: {
              name: existingFormulaNameWith2Arguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toEqual(`The formula "${existingFormulaNameWith2Arguments}" has missing arguments`);
        });

        it('should send an error when too many argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1, argument1],
            callee: {
              name: existingFormulaNameWith2Arguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toEqual(`The formula "${existingFormulaNameWith2Arguments}" has too many arguments`);
        });

        it('should send no error when the arguments are optional with one optional argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1],
            callee: {
              name: existingFormulaNameWith2Arguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
      });

      describe('Infinite Arguments', () => {
        it('should send no error when the arguments are infinite with no infinite argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1],
            callee: {
              name: existingFormulaNameWithInfiniteArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
        it('should send no error when the arguments are infinite with one infinite argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1],
            callee: {
              name: existingFormulaNameWithInfiniteArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
        it('should send no error when the arguments are infinite with two infinite arguments', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1],
            callee: {
              name: existingFormulaNameWithInfiniteArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
      });

      describe('Optional Arguments', () => {
        it('should send no error when the arguments are optional with no optional argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1],
            callee: {
              name: existingFormulaNameWithOptionalArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
        it('should send no error when the arguments are optional with one optional argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1, argument1],
            callee: {
              name: existingFormulaNameWithOptionalArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
      });

      describe('Complex Arguments', () => {
        it('should send no error when the arguments are complex 1', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1],
            callee: {
              name: existingFormulaNameWithComplexArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
        it('should send no error when the arguments are complex 2', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1, argument1],
            callee: {
              name: existingFormulaNameWithComplexArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
        it('should send an error when arguments are missing 1', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [argument1, argument1],
            callee: {
              name: existingFormulaNameWithComplexArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toEqual(`The formula "${existingFormulaNameWithComplexArguments}" has missing arguments`);
        });
      });

      describe('No Arguments', () => {
        it('should send no error when there is no argument', () => {
          const functionNode: FunctionNode = {
            type: AcornType.CallExpression,
            arguments: [],
            callee: {
              name: existingFormulaNameWithNoArguments,
              type: AcornType.Identifier,
            }
          };
          expect(syntaxErrorInFormula(initializeNode(functionNode), formulas, []))
            .toBeUndefined();
        });
      });
    });

    describe('with Binary operation', () => {

      it('should return null when it works', () => {
        const variableNode: BinaryOperationNode = {
          type: AcornType.BinaryExpression,
          operator: '+',
          left: {
            type: AcornType.Identifier,
            name: existingVariableName,
          },
          right: {
            type: AcornType.Identifier,
            name: existingVariableName,
          }
        };
        expect(syntaxErrorInFormula(initializeNode(variableNode), formulas, [existingVariableName]))
          .toBeNull();
      });

      it('should send an error when variable does not exist in an operation - right side', () => {
        const variableNode: BinaryOperationNode = {
          type: AcornType.BinaryExpression,
          operator: '+',
          left: {
            type: AcornType.Identifier,
            name: existingVariableName,
          },
          right: {
            type: AcornType.Identifier,
            name: notExistingVariableName,
          }
        };
        expect(syntaxErrorInFormula(initializeNode(variableNode), formulas, [existingVariableName]))
          .toEqual(`The variable "${notExistingVariableName}" doesn't exit`);
      });

      it('should send an error when variable does not exist in an operation - left side', () => {
        const variableNode: BinaryOperationNode = {
          type: AcornType.BinaryExpression,
          operator: '+',
          left: {
            type: AcornType.Identifier,
            name: notExistingVariableName,
          },
          right: {
            type: AcornType.Identifier,
            name: existingVariableName,
          }
        };
        expect(syntaxErrorInFormula(initializeNode(variableNode), formulas, [existingVariableName]))
          .toEqual(`The variable "${notExistingVariableName}" doesn't exit`);
      });
    });

    describe('with variable', () => {

      it('should send an error when variable does not exist', () => {
        const variableNode: IdentifierNode = {
          type: AcornType.Identifier,
          name: notExistingVariableName,
        };
        expect(syntaxErrorInFormula(initializeNode(variableNode), formulas, [existingVariableName]))
          .toEqual(`The variable "${notExistingVariableName}" doesn't exit`);
      });

      it('should send no error when variable name exists', () => {
        const variableNode: IdentifierNode = {
          type: AcornType.Identifier,
          name: existingVariableName,
        };
        expect(syntaxErrorInFormula(initializeNode(variableNode), formulas, [existingVariableName]))
          .toBeNull();
      });
    });

    function initializeNode(node: PotentialNode): AcornNode {
      return {
        type: AcornType.Program,
        body: [{
          type: null,
          params: [],
          id: {
            type: null,
            name: null,
          },
          body: node,
        }]
      };
    }
  });

  describe(`reformat AcornJs error - function "${formatAcornError.name}"`, () => {
    it('it should reformat acorn with Unexpected character', () => {
      const error = formatAcornError(`SyntaxError: Unexpected character '§' (1:3)`);
      expect(error).toEqual(`Unexpected character '§' `);
    });
  });

  describe(`Check Closing bracket - function "${isBracketMissing.name}"`, () => {
    it('it should find no missing bracket 1', () => {
      const isMissing = isBracketMissing(`(this is (an example))`);
      expect(isMissing).toEqual(false);
    });

    it('it should find no missing bracket 2', () => {
      const isMissing = isBracketMissing(`"a" + "(test"`);
      expect(isMissing).toEqual(false);
    });

    it('it should find no missing bracket 3', () => {
      const isMissing = isBracketMissing(`"a" + '(test'`);
      expect(isMissing).toEqual(false);
    });

    it('it should find missing bracket 1', () => {
      const isMissing = isBracketMissing(`(this is (an example)`);
      expect(isMissing).toEqual(true);
    });

    it('it should find missing bracket 2', () => {
      const isMissing = isBracketMissing(`this is (an example))`);
      expect(isMissing).toEqual(true);
    });

    it('it should find missing bracket 3', () => {
      const isMissing = isBracketMissing(`))this is an example((`);
      expect(isMissing).toEqual(true);
    });
  });
});
