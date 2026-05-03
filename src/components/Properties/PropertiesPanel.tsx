import { useGraphStore } from "../../store/useGraphStore";
import { NODE_DEFINITIONS } from "../Palette/nodeDefinitions";

export default function PropertiesPanel() {
  const {
    nodes,
    edges,
    selectedNodeId,
    selectedEdgeId,
    updateNode,
    updateEdgeLabel,
  } = useGraphStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  if (selectedEdge) {
    return (
      <div className="p-3 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1">
            Edge Label
          </label>
          <input
            type="text"
            value={String(selectedEdge.label ?? "")}
            onChange={(e) => updateEdgeLabel(selectedEdge.id, e.target.value)}
            placeholder="Add a label..."
            className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2
                       text-sm text-[#f1f5f9] focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-2">
            Connection
          </label>
          <div className="text-sm text-[#cbd5e1] space-y-1">
            <p>
              <span className="text-[#64748b]">From:</span>{" "}
              {selectedEdge.source}
            </p>
            <p>
              <span className="text-[#64748b]">To:</span> {selectedEdge.target}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedNode) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-[#64748b] p-4 text-center">
        Select a node or edge to edit its properties
      </div>
    );
  }

  const def = NODE_DEFINITIONS[selectedNode.data.type];

  return (
    <div className="p-3 space-y-4">
      <div>
        <label className="block text-xs font-medium text-[#94a3b8] mb-1">
          Label
        </label>
        <input
          type="text"
          value={selectedNode.data.label}
          onChange={(e) =>
            updateNode(selectedNode.id, { label: e.target.value })
          }
          className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2
                     text-sm text-[#f1f5f9] focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#94a3b8] mb-1">
          Description
        </label>
        <textarea
          value={selectedNode.data.description ?? ""}
          onChange={(e) =>
            updateNode(selectedNode.id, { description: e.target.value })
          }
          rows={3}
          className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2
                     text-sm text-[#f1f5f9] focus:outline-none focus:border-cyan-500/50 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#94a3b8] mb-2">
          Type
        </label>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0f172a] border border-[#334155]">
          {def?.icon && <def.icon size={16} style={{ color: def?.color }} />}
          <span className="text-sm text-[#cbd5e1]">
            {def?.label ?? "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
}
