import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  type OnNodesChange,
  type OnEdgesChange,
  type Connection,
  type Node,
  type Edge,
  type XYPosition,
} from "@xyflow/react";
import type { StructNodeData, NodeType } from "../types/nodes";
import { NODE_DEFINITIONS } from "../components/Palette/nodeDefinitions";

interface GraphState {
  nodes: Node<StructNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: XYPosition) => void;
  updateNode: (id: string, data: Partial<StructNodeData>) => void;
  removeSelected: () => void;
  selectNode: (id: string | null) => void;
  getNodesAndEdges: () => { nodes: Node[]; edges: Edge[] };
  setNodes: (nodes: Node<StructNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
}

let nodeIdCounter = 0;

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node<StructNodeData>[],
    });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection: Connection) => {
    const edge: Edge = {
      id: `e-${connection.source}-${connection.target}`,
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle ?? undefined,
      targetHandle: connection.targetHandle ?? undefined,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#475569", strokeWidth: 2 },
    };
    set({ edges: [...get().edges, edge] });
  },

  addNode: (type: NodeType, position: XYPosition) => {
    const def = NODE_DEFINITIONS[type];
    const id = `node-${++nodeIdCounter}`;
    const node: Node<StructNodeData> = {
      id,
      type,
      position,
      data: {
        label: def.defaultLabel,
        type,
        ports: def.ports,
      },
    };
    set({ nodes: [...get().nodes, node] });
  },

  updateNode: (id: string, data: Partial<StructNodeData>) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    });
  },

  removeSelected: () => {
    const { nodes, edges, selectedNodeId } = get();
    if (!selectedNodeId) return;
    set({
      nodes: nodes.filter((n) => n.id !== selectedNodeId),
      edges: edges.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId,
      ),
      selectedNodeId: null,
    });
  },

  selectNode: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  getNodesAndEdges: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },

  setNodes: (nodes: Node<StructNodeData>[]) => {
    set({ nodes });
  },

  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
}));
