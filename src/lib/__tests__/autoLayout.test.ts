import { describe, it, expect } from 'vitest';
import { autoLayout } from '../autoLayout';
import type { Node, Edge } from '@xyflow/react';

describe('autoLayout', () => {
  it('returns nodes with updated positions', () => {
    const nodes: Node[] = [
      { id: '1', position: { x: 0, y: 0 }, data: {} },
      { id: '2', position: { x: 0, y: 0 }, data: {} },
    ];
    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
    ];

    const result = autoLayout(nodes as any, edges as any) as any;

    expect(result).toHaveLength(2);
    // Positions should be different from original (0,0)
    expect(result[0].position.x).not.toBe(0);
    expect(result[0].position.y).not.toBe(0);
  });

  it('preserves node count', () => {
    const nodes: Node[] = [
      { id: '1', position: { x: 0, y: 0 }, data: {} },
      { id: '2', position: { x: 0, y: 0 }, data: {} },
      { id: '3', position: { x: 0, y: 0 }, data: {} },
    ];
    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ];

    const result = autoLayout(nodes as any, edges as any) as any;
    expect(result).toHaveLength(3);
  });

  it('handles empty nodes', () => {
    const result = autoLayout([], []);
    expect(result).toHaveLength(0);
  });
});
