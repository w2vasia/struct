import { useRef, useEffect, useCallback } from "react";
import Palette from "./components/Palette/Palette";
import StructCanvas from "./components/Canvas/StructCanvas";
import PropertiesPanel from "./components/Properties/PropertiesPanel";
import Toolbar from "./components/Toolbar/Toolbar";
import { useGraphStore } from "./store/useGraphStore";
import { useHistoryStore } from "./store/useHistoryStore";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { nodes, selectedNodeId, addNode } = useGraphStore.getState();
    const history = useHistoryStore.getState();

    // Undo: Ctrl+Z
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      const state = history.undo();
      if (state) {
        useGraphStore.setState({
          nodes: state.nodes as any,
          edges: state.edges as any,
        });
      }
    }

    // Redo: Ctrl+Shift+Z or Ctrl+Y
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) {
      e.preventDefault();
      const state = history.redo();
      if (state) {
        useGraphStore.setState({
          nodes: state.nodes as any,
          edges: state.edges as any,
        });
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "y") {
      e.preventDefault();
      const state = history.redo();
      if (state) {
        useGraphStore.setState({
          nodes: state.nodes as any,
          edges: state.edges as any,
        });
      }
    }

    // Copy: Ctrl+C
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      if (selectedNodeId) {
        const node = nodes.find((n) => n.id === selectedNodeId);
        if (node) {
          navigator.clipboard.writeText(JSON.stringify(node));
        }
      }
    }

    // Paste: Ctrl+V
    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      navigator.clipboard
        .readText()
        .then((text) => {
          try {
            const data = JSON.parse(text);
            if (data && data.data && data.data.type) {
              const pos = {
                x: (data.position?.x ?? 0) + 50,
                y: (data.position?.y ?? 0) + 50,
              };
              addNode(data.data.type, pos);
            }
          } catch {
            // ignore invalid clipboard content
          }
        })
        .catch(() => {
          // ignore clipboard errors
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex h-screen w-screen bg-[#020617] select-none">
      {/* Left: Palette */}
      <aside className="w-60 border-r border-[#334155] flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-[#334155]">
          <h1 className="text-lg font-bold text-[#f1f5f9]">Struct</h1>
          <p className="text-xs text-[#94a3b8]">System Design Visualizer</p>
        </div>
        <div className="flex-1 p-2 overflow-y-auto">
          <Palette />
        </div>
      </aside>

      {/* Center: Toolbar + Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Toolbar reactFlowEl={canvasRef.current} />
        <div ref={canvasRef} className="flex-1 relative">
          <StructCanvas />
        </div>
      </div>

      {/* Right: Properties */}
      <aside className="w-72 border-l border-[#334155] flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-[#334155]">
          <h2 className="text-sm font-semibold text-[#f1f5f9]">Properties</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PropertiesPanel />
        </div>
      </aside>
    </div>
  );
}

export default App;
