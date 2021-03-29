import { Store } from '../interfaces/store';
import { Formula } from '../interfaces/formula';
import { ANode, IdentifierNode } from '../interfaces/acorn/acorn-node';
import {
  isBlock,
  isConditionalExpression,
  isExpressionStatement,
  isFunction,
  isIfStatement,
  isLogicalOperation,
  isNumberOrString,
  isProgram,
  isRegex,
  isReturnStatement,
  isUnary,
  isVariableOrFunctionIdentifier
} from '../interfaces/acorn/acorn-utils';
import { AcornType } from '../interfaces/acorn/acorn-type';

export function syntaxErrorInFormula(node: ANode, formulas: Store<Formula>, formattedVariables: string[]): string {
  if (!Object.values(AcornType).includes(node.type)) {
    return `The operation ${node.type} is not implemented`;
  } else if (isProgram(node)) {
    return node.body.length > 0 && syntaxErrorInFormula(node.body[0].body, formulas, formattedVariables);
  } else if (isLogicalOperation(node)) {
    const leftSideSyntaxError = syntaxErrorInFormula(node.left, formulas, formattedVariables);
    if (leftSideSyntaxError) {
      return leftSideSyntaxError;
    }
    const rightSideSyntaxError = syntaxErrorInFormula(node.right, formulas, formattedVariables);
    if (rightSideSyntaxError) {
      return rightSideSyntaxError;
    }
  } else if (isFunction(node)) {
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
      .map(child => syntaxErrorInFormula(child, formulas, formattedVariables))
      .find(child => !!child);
  } else if (isVariableOrFunctionIdentifier(node)) {
    return formattedVariables.includes(node.name) ? null : `The variable "${node.name}" doesn't exit`;
  } else if (isUnary(node)) {
    return syntaxErrorInFormula(node.argument, formulas, formattedVariables);
  } else if (isExpressionStatement(node)) {
    return syntaxErrorInFormula(node.expression, formulas, formattedVariables);
  } else if (isConditionalExpression(node)) {
    return syntaxErrorInFormula(node.expression, formulas, formattedVariables);
  } else if (isBlock(node)) {
    return node.body
      .map(child => syntaxErrorInFormula(child, formulas, formattedVariables))
      .find(child => !!child);
  } else if (isReturnStatement(node)) {
    return syntaxErrorInFormula(node.argument, formulas, formattedVariables);
  } else if (isIfStatement(node)) {
    const testCheck = syntaxErrorInFormula(node.test, formulas, formattedVariables);
    if (!!testCheck) {
      return testCheck;
    }
    const consequentCheck = syntaxErrorInFormula(node.consequent, formulas, formattedVariables);
    if (!!consequentCheck) {
      return consequentCheck;
    }
    if (node.alternate) {
      const alternateCheck = syntaxErrorInFormula(node.alternate, formulas, formattedVariables);
      if (!!alternateCheck) {
        return alternateCheck;
      }
    }
  } else if (isNumberOrString(node)) {
  } else if (isRegex(node)) {
  }
  return null;
}

export function formatAcornError(error): string {
  error = error.replace('SyntaxError: ', '');
  const match: RegExpMatchArray = error.match(new RegExp(/\(1:(\d+)\)/)) || [];
  error = error.replace(match[0], '');
  return error;
}

export function isBracketMissing(innerText: string): boolean {
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
