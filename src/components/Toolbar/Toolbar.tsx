import { useGraphStore } from '../../store/useGraphStore';
import { autoLayout } from '../../lib/autoLayout';
import { exportToPng } from '../Export/exportToPng';

export default function Toolbar({ reactFlowEl }: { reactFlowEl: HTMLDivElement | null }) {
  const { nodes, edges, setNodes } = useGraphStore();

  const handleLayout = () => {
    const laidOut = autoLayout(nodes, edges);
    setNodes(laidOut as any);
  };

  const handleExport = async () => {
    if (reactFlowEl) {
      await exportToPng(reactFlowEl);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#334155] bg-[#0f172a]/50">
      <button
        onClick={handleLayout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-[#f1f5f9] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Auto Layout
      </button>

      <div className="w-px h-4 bg-[#334155]" />

      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-[#f1f5f9] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export PNG
      </button>

      <div className="flex-1" />

      <span className="text-xs text-[#64748b]">
        {nodes.length} node{nodes.length !== 1 ? 's' : ''}, {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
