import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { StructNodeData } from "../types/nodes";
import { NODE_DEFINITIONS } from "../components/Palette/nodeDefinitions";

const handleStyle = {
  width: 12,
  height: 12,
  border: "2px solid #0f172a",
  transition: "transform 0.15s",
};

function ExternalNode({ data, selected }: NodeProps<Node<StructNodeData>>) {
  const def = NODE_DEFINITIONS[data.type];

  return (
    <div
      className={`
        rounded-xl border-2 px-4 py-3 min-w-[180px] transition-shadow
        ${selected ? "shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50" : ""}
      `}
      style={{
        borderColor: def?.color ?? "#22d3ee",
        background: def?.fillColor ?? "rgba(8, 51, 68, 0.4)",
      }}
    >
      {def?.ports?.input && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={true}
          style={{
            ...handleStyle,
            background: def?.color ?? "#22d3ee",
          }}
        />
      )}
      <div className="flex items-center gap-2">
        {def?.icon && <def.icon size={18} style={{ color: def?.color }} />}
        <span className="text-sm font-medium text-[#f1f5f9]">{data.label}</span>
      </div>
      {data.description && (
        <p className="text-xs text-[#94a3b8] mt-1 ml-[26px]">
          {data.description}
        </p>
      )}
      {def?.ports?.output && (
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={true}
          style={{
            ...handleStyle,
            background: def?.color ?? "#22d3ee",
          }}
        />
      )}
    </div>
  );
}

export default memo(ExternalNode);
