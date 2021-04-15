import { Injectable } from '@angular/core';
import {
  AcornNode,
  ANode,
  BinaryOperationNode,
  BlockNode,
  ExpressionStatementNode,
  FunctionNode,
  IdentifierNode,
  IfStatementNode,
  RegexNode,
  ReturnStatementNode,
  StringOrNumberNode,
  UnaryNode
} from './interfaces/acorn/acorn-node';
import { AcornType } from './interfaces/acorn/acorn-type';
import { Store } from './interfaces/store';
import { Formula } from './interfaces/formula';

@Injectable({
  providedIn: 'root'
})
export class FormulaPythonEditorService {

  constructor() {
  }

  syntaxErrorInFormula(node: ANode, formulas: Store<Formula>, formattedVariables: string[]): string {
    if (!Object.values(AcornType).includes(node.type)) {
      return `The operation ${node.type} is not implemented`;
    } else if (this.isProgram(node)) {
      return node.body.length > 0 && this.syntaxErrorInFormula(node.body[0].body, formulas, formattedVariables);
    } else if (this.isLogicalOperation(node)) {
      const leftSideSyntaxError = this.syntaxErrorInFormula(node.left, formulas, formattedVariables);
      if (leftSideSyntaxError) {
        return leftSideSyntaxError;
      }
      const rightSideSyntaxError = this.syntaxErrorInFormula(node.right, formulas, formattedVariables);
      if (rightSideSyntaxError) {
        return rightSideSyntaxError;
      }
    } else if (this.isFunction(node)) {
      const calleeNode: IdentifierNode = node.callee;
      const functionName = calleeNode.name;
      if (!formulas.ids.includes(functionName)) {
        return `The formula "${functionName}" doesn't exit`;
      }
      let argumentNumber = node.arguments.length;
      let isInfiniteArgumentsOrLimitedOptional = false;
      for (let i = 0; i < formulas.item[functionName].syntaxParameter.length; i++) {
        const argumentType = formulas.item[functionName].syntaxParameter[i];
        if (argumentType === 1000) {
          isInfiniteArgumentsOrLimitedOptional = true;
          break;
        }
        if (argumentType === 0 && i === node.arguments.length) {
          isInfiniteArgumentsOrLimitedOptional = true;
          break;
        } else if (argumentType === 1 || argumentType === 0) {
          argumentNumber--;
          if (argumentNumber < 0) {
            return `The formula "${functionName}" has missing arguments`;
          }
        }
      }
      if (!isInfiniteArgumentsOrLimitedOptional && argumentNumber > 0) {
        return `The formula "${functionName}" has too many arguments`;
      }
      return node.arguments
        .map(child => this.syntaxErrorInFormula(child, formulas, formattedVariables))
        .find(child => !!child);
    } else if (this.isVariableOrFunctionIdentifier(node)) {
      return formattedVariables.includes(node.name) ? null : `The variable "${node.name}" doesn't exit`;
    } else if (this.isUnary(node)) {
      return this.syntaxErrorInFormula(node.argument, formulas, formattedVariables);
    } else if (this.isExpressionStatement(node)) {
      return this.syntaxErrorInFormula(node.expression, formulas, formattedVariables);
    } else if (this.isConditionalExpression(node)) {
      return this.syntaxErrorInFormula(node.expression, formulas, formattedVariables);
    } else if (this.isBlock(node)) {
      return node.body
        .map(child => this.syntaxErrorInFormula(child, formulas, formattedVariables))
        .find(child => !!child);
    } else if (this.isReturnStatement(node)) {
      return this.syntaxErrorInFormula(node.argument, formulas, formattedVariables);
    } else if (this.isIfStatement(node)) {
      const testCheck = this.syntaxErrorInFormula(node.test, formulas, formattedVariables);
      if (!!testCheck) {
        return testCheck;
      }
      const consequentCheck = this.syntaxErrorInFormula(node.consequent, formulas, formattedVariables);
      if (!!consequentCheck) {
        return consequentCheck;
      }
      if (node.alternate) {
        const alternateCheck = this.syntaxErrorInFormula(node.alternate, formulas, formattedVariables);
        if (!!alternateCheck) {
          return alternateCheck;
        }
      }
    } else if (this.isNumberOrString(node)) {
    } else if (this.isRegex(node)) {
    }
    return null;
  }

  formatAcornError(error): string {
    error = error.replace('SyntaxError: ', '');
    const match: RegExpMatchArray = error.match(new RegExp(/\(1:(\d+)\)/)) || [];
    error = error.replace(match[0], '');
    return error;
  }

  isBracketMissing(innerText: string): boolean {
    const quoteMemory: { type: 'single' | 'double' }[] = [];
    let openBracket = 0;
    for (const character of innerText) {
      if (character === `"`) {
        if (quoteMemory.length > 0 && quoteMemory[quoteMemory.length - 1].type === 'double') {
          quoteMemory.pop();
        } else {
          quoteMemory.push({type: 'double'});
        }
      } else if (character === `'`) {
        if (quoteMemory.length > 0 && quoteMemory[quoteMemory.length - 1].type === 'single') {
          quoteMemory.pop();
        } else {
          quoteMemory.push({type: 'single'});
        }
      } else if (quoteMemory.length === 0 && character === '(') {
        openBracket++;
      } else if (quoteMemory.length === 0 && character === ')') {
        if (openBracket <= 0) {
          return true;
        } else {
          openBracket--;
        }
      }
    }
    return openBracket !== 0;
  }

  private isLogicalOperation(node: ANode): node is BinaryOperationNode {
    return node && (node.type === AcornType.BinaryExpression || node.type === AcornType.LogicalExpression);
  }

  private isNumberOrString(node: ANode): node is StringOrNumberNode {
    return node && node.type === AcornType.Literal;
  }

  private isRegex(node: ANode): node is RegexNode {
    return node && node.type === AcornType.Literal && 'regex' in node;
  }

  private isIfStatement(node: ANode): node is IfStatementNode {
    return node && node.type === AcornType.IfStatement;
  }

  private isFunction(node: ANode): node is FunctionNode {
    return node && node.type === AcornType.CallExpression;
  }

  private isVariableOrFunctionIdentifier(node: ANode): node is IdentifierNode {
    return node && node.type === AcornType.Identifier;
  }

  private isUnary(node: ANode): node is UnaryNode {
    return node && node.type === AcornType.UnaryExpression;
  }

  private isProgram(node: ANode): node is AcornNode {
    return node && node.type === AcornType.Program;
  }

  private isBlock(node: ANode): node is BlockNode {
    return node && node.type === AcornType.BlockStatement;
  }

  private isExpressionStatement(node: ANode): node is ExpressionStatementNode {
    return node && node.type === AcornType.ExpressionStatement;
  }

  private isConditionalExpression(node: ANode): node is ExpressionStatementNode {
    return node && node.type === AcornType.ConditionalExpression;
  }

  private isReturnStatement(node: ANode): node is ReturnStatementNode {
    return node && node.type === AcornType.ReturnStatement;
  }
}
