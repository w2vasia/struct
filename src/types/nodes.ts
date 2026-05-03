import type { Node } from "@xyflow/react";

export type NodeType =
  | "service"
  | "database"
  | "queue"
  | "apiGateway"
  | "frontend"
  | "storage"
  | "external"
  | "auth"
  | "cache";

export interface StructNodeData {
  label: string;
  description?: string;
  type: NodeType;
  ports?: {
    input?: boolean;
    output?: boolean;
  };
  [key: string]: unknown;
}

export type StructNode = Node<StructNodeData>;
