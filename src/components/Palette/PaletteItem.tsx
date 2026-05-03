import { type DragEvent, memo } from 'react';
import type { NodeDefinition } from './nodeDefinitions';

interface Props {
  definition: NodeDefinition;
}

function PaletteItem({ definition }: Props) {
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('application/reactflow', definition.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  const Icon = definition.icon;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-3 p-2.5 rounded-lg cursor-grab active:cursor-grabbing
                 hover:bg-[#1e293b] transition-colors border border-transparent hover:border-[#334155]"
    >
      <Icon size={18} style={{ color: definition.color }} />
      <span className="text-sm text-[#cbd5e1]">{definition.label}</span>
    </div>
  );
}

export default memo(PaletteItem);
