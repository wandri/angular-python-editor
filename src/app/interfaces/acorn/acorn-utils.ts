import { AcornType } from './acorn-type';
import {
  AcornNode,
  ANode,
  BASIC_OPERATIONS,
  BinaryOperationNode,
  CONDITIONAL_OPERATIONS,
  ExpressionStatementNode,
  FunctionNode,
  IdentifierNode,
  RegexNode,
  StringOrNumberNode,
  UnaryNode
} from './acorn-node';

export function isBinaryOperation(node: ANode): node is BinaryOperationNode {
  return node && node.type === AcornType.BinaryExpression;
}

export function isNumberOrString(node: ANode): node is StringOrNumberNode {
  return node && node.type === AcornType.Literal;
}

export function isRegex(node: ANode): node is RegexNode {
  return node && node.type === AcornType.Literal && 'regex' in node;
}

export function isFunction(node: ANode): node is FunctionNode {
  return node && node.type === AcornType.CallExpression;
}

export function isVariableOrFunctionIdentifier(node: ANode): node is IdentifierNode {
  return node && node.type === AcornType.Identifier;
}

export function isUnary(node: ANode): node is UnaryNode {
  return node && node.type === AcornType.UnaryExpression;
}

export function isProgram(node: ANode): node is AcornNode {
  return node && node.type === AcornType.Program;
}

export function isExpressionStatement(node: ANode): node is ExpressionStatementNode {
  return node && node.type === AcornType.ExpressionStatement;
}

export function isConditionalExpression(node: ANode): node is ExpressionStatementNode {
  return node && node.type === AcornType.ConditionalExpression;
}

export function isBasicOperation(node: BinaryOperationNode): boolean {
  return node && BASIC_OPERATIONS.includes(node.operator);
}

export function isConditionalOperation(node: BinaryOperationNode): boolean {
  return node && CONDITIONAL_OPERATIONS.includes(node.operator);
}
