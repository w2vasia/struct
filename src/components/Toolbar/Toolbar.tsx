import { useCallback, useState } from "react";
import { useGraphStore } from "../../store/useGraphStore";
import { autoLayout } from "../../lib/autoLayout";
import { exportToPng, exportToSvg } from "../Export/exportToPng";

export default function Toolbar({
  reactFlowEl,
}: {
  reactFlowEl: HTMLDivElement | null;
}) {
  const { nodes, edges, setNodes } = useGraphStore();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleLayout = () => {
    const laidOut = autoLayout(nodes, edges);
    setNodes(laidOut as any);
  };

  const handleExportPng = async () => {
    if (reactFlowEl) {
      await exportToPng(reactFlowEl);
    }
    setShowExportMenu(false);
  };

  const handleExportSvg = async () => {
    if (reactFlowEl) {
      await exportToSvg(reactFlowEl);
    }
    setShowExportMenu(false);
  };

  const handleShare = useCallback(() => {
    const graphData = { nodes, edges };
    const encoded = btoa(JSON.stringify(graphData));
    const url = `${window.location.origin}${window.location.pathname}#graph=${encoded}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Share link copied to clipboard!");
      })
      .catch(() => {
        // fallback: show the URL in the console
        console.log("Share URL:", url);
      });
  }, [nodes, edges]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#334155] bg-[#0f172a]/50">
      <button
        onClick={handleLayout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-[#f1f5f9] transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        Auto Layout
      </button>

      <div className="w-px h-4 bg-[#334155]" />

      <div className="relative">
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                     bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-[#f1f5f9] transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </button>

        {showExportMenu && (
          <div className="absolute top-full left-0 mt-1 w-36 rounded-lg border border-[#334155] bg-[#0f172a] shadow-xl py-1 z-50">
            <button
              onClick={handleExportPng}
              className="w-full px-3 py-2 text-left text-sm text-[#cbd5e1] hover:bg-[#1e293b] transition-colors"
            >
              Export PNG
            </button>
            <button
              onClick={handleExportSvg}
              className="w-full px-3 py-2 text-left text-sm text-[#cbd5e1] hover:bg-[#1e293b] transition-colors"
            >
              Export SVG
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-[#f1f5f9] transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share
      </button>

      <div className="flex-1" />

      <span className="text-xs text-[#64748b]">
        {nodes.length} node{nodes.length !== 1 ? "s" : ""}, {edges.length} edge
        {edges.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
