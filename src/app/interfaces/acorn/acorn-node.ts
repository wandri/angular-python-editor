import {AcornType} from './acorn-type';

interface ANode {
  type: AcornType;
  start: number;
  end: number;
}

interface Node extends ANode {
  expression?: VariableNode | BinaryOperationNode | StringOrNumberNode;
  arguments?: AcornNode[];
  // Operator node
  callee?: FunctionNode;
}

interface ExpressionStatementNode extends ANode {
  expression: Node;
}

export interface AcornNode extends ANode {
  body?: ExpressionStatementNode[];
}

export interface VariableNode {
  name: string;
}

interface StringOrNumberNode {
  value: number;
  raw: string;
}

export interface BinaryOperationNode extends ANode {
  operator: '+' | '-' | '/' | '%' | '^' | '*' | '**';
  // Left side of a Binary operation
  left?: AcornNode;
  // Right side of a binary operation
  right?: AcornNode;
}

export interface FunctionNode extends ANode {
  name: string;
}
