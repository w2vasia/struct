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

const STORAGE_KEY = "struct-graph";

function deduplicateNodes(
  nodes: Node<StructNodeData>[],
): Node<StructNodeData>[] {
  const seen = new Map<string, Node<StructNodeData>>();
  for (const node of nodes) {
    // Keep the LAST occurrence of each ID
    seen.set(node.id, node);
  }
  return Array.from(seen.values());
}

function loadFromStorage(): {
  nodes: Node<StructNodeData>[];
  edges: Edge[];
} | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const data = JSON.parse(saved) as {
      nodes: Node<StructNodeData>[];
      edges: Edge[];
    };
    if (data.nodes) {
      data.nodes = deduplicateNodes(data.nodes);
    }
    return data;
  } catch {
    return null;
  }
}

function saveToStorage(nodes: Node<StructNodeData>[], edges: Edge[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
  } catch {
    // ignore
  }
}

const initialStorage = loadFromStorage();

interface GraphState {
  nodes: Node<StructNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: XYPosition) => void;
  updateNode: (id: string, data: Partial<StructNodeData>) => void;
  updateEdgeLabel: (id: string, label: string) => void;
  removeSelected: () => void;
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  getNodesAndEdges: () => { nodes: Node[]; edges: Edge[] };
  setNodes: (nodes: Node<StructNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
}

function getInitialCounter(nodes: Node<StructNodeData>[]): number {
  const nodeIdPattern = /^node-(\d+)$/;
  const maxNum = nodes.reduce((max, node) => {
    const match = nodeIdPattern.exec(node.id);
    if (match) {
      const num = parseInt(match[1], 10);
      return num > max ? num : max;
    }
    return max;
  }, 0);
  return maxNum;
}

const initialNodes = initialStorage?.nodes ?? [];
let nodeIdCounter = getInitialCounter(initialNodes);

export const useGraphStore = create<GraphState>((set, get) => {
  const wrappedSet: typeof set = (partial) => {
    set(partial);
    const { nodes, edges } = get();
    saveToStorage(nodes, edges);
  };

  return {
    nodes: initialNodes,
    edges: initialStorage?.edges ?? [],
    selectedNodeId: null,
    selectedEdgeId: null,

    onNodesChange: (changes) => {
      wrappedSet({
        nodes: applyNodeChanges(changes, get().nodes) as Node<StructNodeData>[],
      });
    },

    onEdgesChange: (changes) => {
      wrappedSet({ edges: applyEdgeChanges(changes, get().edges) });
    },

    onConnect: (connection: Connection) => {
      const edge: Edge = {
        id: `e-${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle ?? undefined,
        targetHandle: connection.targetHandle ?? undefined,
        type: "struct",
        style: { stroke: "#475569", strokeWidth: 2 },
      };
      wrappedSet({ edges: [...get().edges, edge] });
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
      wrappedSet({ nodes: [...get().nodes, node] });
    },

    updateNode: (id: string, data: Partial<StructNodeData>) => {
      wrappedSet({
        nodes: get().nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
        ),
      });
    },

    removeSelected: () => {
      const { nodes, edges, selectedNodeId } = get();
      if (!selectedNodeId) return;
      wrappedSet({
        nodes: nodes.filter((n) => n.id !== selectedNodeId),
        edges: edges.filter(
          (e) => e.source !== selectedNodeId && e.target !== selectedNodeId,
        ),
        selectedNodeId: null,
      });
    },

    updateEdgeLabel: (id: string, label: string) => {
      wrappedSet({
        edges: get().edges.map((e) =>
          e.id === id ? { ...e, label, data: { ...e.data, label } } : e,
        ),
      });
    },

    selectNode: (id: string | null) => {
      set({ selectedNodeId: id, selectedEdgeId: null });
    },

    selectEdge: (id: string | null) => {
      set({ selectedEdgeId: id, selectedNodeId: null });
    },

    getNodesAndEdges: () => {
      const { nodes, edges } = get();
      return { nodes, edges };
    },

    setNodes: (nodes: Node<StructNodeData>[]) => {
      wrappedSet({ nodes });
    },

    setEdges: (edges: Edge[]) => {
      wrappedSet({ edges });
    },
  };
});
