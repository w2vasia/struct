function App() {
  return (
    <div className="flex h-screen w-screen bg-[#020617]">
      {/* Palette */}
      <aside className="w-60 border-r border-[#334155] flex flex-col">
        <div className="p-3 border-b border-[#334155]">
          <h1 className="text-lg font-bold text-[#f1f5f9]">Struct</h1>
          <p className="text-xs text-[#94a3b8]">System Design Visualizer</p>
        </div>
        <div className="flex-1 p-2 overflow-y-auto">
          <p className="text-sm text-[#64748b] p-4 text-center">
            Components will appear here
          </p>
        </div>
      </aside>

      {/* Canvas */}
      <main className="flex-1 relative">
        <p className="text-sm text-[#64748b] absolute inset-0 flex items-center justify-center">
          Canvas will appear here
        </p>
      </main>

      {/* Properties */}
      <aside className="w-72 border-l border-[#334155] flex flex-col">
        <div className="p-3 border-b border-[#334155]">
          <h2 className="text-sm font-semibold text-[#f1f5f9]">Properties</h2>
        </div>
        <div className="flex-1 p-2 overflow-y-auto">
          <p className="text-sm text-[#64748b] p-4 text-center">
            Select a node to edit
          </p>
        </div>
      </aside>
    </div>
  );
}

export default App;
