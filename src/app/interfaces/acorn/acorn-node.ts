import { AcornType } from './acorn-type';

export const BASIC_OPERATIONS: string[] = ['+', '-', '/', '%', '^', '*', '**'];
export const CONDITIONAL_OPERATIONS: string[] = ['==', '===', '<=', '>=', '>', '<', '!=', '!=='];

export type PotentialNode = IdentifierNode | BinaryOperationNode | StringOrNumberNode | ConditionalExpressionNode | FunctionNode;

export interface ANode {
  type: AcornType;
  start?: number;
  end?: number;
}

export interface AcornNode extends ANode {
  body?: ExpressionStatementNode[];
}

export interface ExpressionStatementNode extends ANode {
  expression: PotentialNode;
}

export interface RegexNode extends IdentifierNode {
  regex: {
    pattern: string;
    flags: string;
  };
}

export interface IdentifierNode extends ANode {
  name: string;
}

export interface StringOrNumberNode extends ANode {
  value: number | string;
  raw: string;
}

export interface ConditionalExpressionNode extends ANode {
  test: PotentialNode;
  consequent: PotentialNode;
  alternate: PotentialNode;
}

export interface BinaryOperationNode extends ANode {
  operator: string;
  // Left side of a Binary operation
  left?: PotentialNode;
  // Right side of a binary operation
  right?: PotentialNode;
}

export interface FunctionNode extends ANode {
  arguments?: PotentialNode[];
  // Operator node
  callee?: IdentifierNode;
}

export interface UnaryNode extends ANode {
  operator: string;
  prefix: boolean;
  argument: PotentialNode;
}
