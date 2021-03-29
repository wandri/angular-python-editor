import { AcornType } from './acorn-type';
import {
  AcornNode,
  ANode,
  BASIC_OPERATIONS,
  BinaryOperationNode,
  BlockNode,
  CONDITIONAL_OPERATIONS,
  ExpressionStatementNode,
  FunctionNode,
  IdentifierNode,
  IfStatementNode,
  RegexNode,
  ReturnStatementNode,
  StringOrNumberNode,
  UnaryNode
} from './acorn-node';

export function isLogicalOperation(node: ANode): node is BinaryOperationNode {
  return node && (node.type === AcornType.BinaryExpression || node.type === AcornType.LogicalExpression);
}

export function isNumberOrString(node: ANode): node is StringOrNumberNode {
  return node && node.type === AcornType.Literal;
}

export function isRegex(node: ANode): node is RegexNode {
  return node && node.type === AcornType.Literal && 'regex' in node;
}

export function isIfStatement(node: ANode): node is IfStatementNode {
  return node && node.type === AcornType.IfStatement;
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

export function isBlock(node: ANode): node is BlockNode {
  return node && node.type === AcornType.BlockStatement;
}

export function isFunctionDeclaration(node: ANode): node is AcornNode {
  return node && node.type === AcornType.FunctionDeclaration;
}

export function isExpressionStatement(node: ANode): node is ExpressionStatementNode {
  return node && node.type === AcornType.ExpressionStatement;
}

export function isConditionalExpression(node: ANode): node is ExpressionStatementNode {
  return node && node.type === AcornType.ConditionalExpression;
}

export function isReturnStatement(node: ANode): node is ReturnStatementNode {
  return node && node.type === AcornType.ReturnStatement;
}

export function isBasicOperation(node: BinaryOperationNode): boolean {
  return node && BASIC_OPERATIONS.includes(node.operator);
}

export function isConditionalOperation(node: BinaryOperationNode): boolean {
  return node && CONDITIONAL_OPERATIONS.includes(node.operator);
}
