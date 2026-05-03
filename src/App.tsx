import { useRef } from "react";
import Palette from "./components/Palette/Palette";
import StructCanvas from "./components/Canvas/StructCanvas";
import PropertiesPanel from "./components/Properties/PropertiesPanel";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

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
