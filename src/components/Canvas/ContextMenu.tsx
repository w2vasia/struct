import { useEffect, useRef, useCallback } from "react";
import { useGraphStore } from "../../store/useGraphStore";

interface ContextMenuProps {
  x: number;
  y: number;
  nodeId: string;
  type: "node" | "edge";
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  nodeId,
  type,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleDuplicate = () => {
    if (type !== "node") return;
    const { nodes, addNode } = useGraphStore.getState();
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const pos = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };
      addNode(node.data.type, pos);
    }
    onClose();
  };

  const handleCopy = useCallback(() => {
    if (type !== "node") return;
    const { nodes } = useGraphStore.getState();
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      void navigator.clipboard.writeText(JSON.stringify(node));
    }
    onClose();
  }, [nodeId, onClose, type]);

  const handleDelete = () => {
    const { selectNode, selectEdge, removeSelected } = useGraphStore.getState();
    if (type === "node") {
      selectNode(nodeId);
    } else {
      selectEdge(nodeId);
    }
    removeSelected();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-40 rounded-lg border border-[#334155] bg-[#0f172a] shadow-xl py-1"
      style={{ left: x, top: y }}
    >
      {type === "node" && (
        <>
          <button
            onClick={handleCopy}
            className="w-full px-3 py-2 text-left text-sm text-[#cbd5e1] hover:bg-[#1e293b] transition-colors"
          >
            Copy
          </button>
          <button
            onClick={handleDuplicate}
            className="w-full px-3 py-2 text-left text-sm text-[#cbd5e1] hover:bg-[#1e293b] transition-colors"
          >
            Duplicate
          </button>
          <div className="h-px bg-[#334155] my-1" />
        </>
      )}
      <button
        onClick={handleDelete}
        className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#1e293b] transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
