import { ALL_NODE_TYPES, NODE_DEFINITIONS } from './nodeDefinitions';
import PaletteItem from './PaletteItem';

export default function Palette() {
  return (
    <div className="flex flex-col gap-1">
      {ALL_NODE_TYPES.map((type) => (
        <PaletteItem key={type} definition={NODE_DEFINITIONS[type]} />
      ))}
    </div>
  );
}
