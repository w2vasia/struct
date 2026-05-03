import { describe, it, expect, beforeEach } from 'vitest';
import { useGraphStore } from '../useGraphStore';

describe('useGraphStore', () => {
  beforeEach(() => {
    useGraphStore.setState({ nodes: [], edges: [], selectedNodeId: null });
  });

  it('adds a node', () => {
    useGraphStore.getState().addNode('service', { x: 100, y: 100 });
    const { nodes } = useGraphStore.getState();
    expect(nodes).toHaveLength(1);
    expect(nodes[0].data.label).toBe('New Service');
  });

  it('adds a node with correct type', () => {
    useGraphStore.getState().addNode('database', { x: 0, y: 0 });
    const { nodes } = useGraphStore.getState();
    expect(nodes[0].data.type).toBe('database');
  });

  it('connects two nodes', () => {
    useGraphStore.getState().addNode('service', { x: 0, y: 0 });
    useGraphStore.getState().addNode('database', { x: 200, y: 0 });
    const [n1, n2] = useGraphStore.getState().nodes;
    useGraphStore.getState().onConnect({ source: n1.id, target: n2.id, sourceHandle: null, targetHandle: null });
    expect(useGraphStore.getState().edges).toHaveLength(1);
  });

  it('removes selected node', () => {
    useGraphStore.getState().addNode('service', { x: 0, y: 0 });
    const node = useGraphStore.getState().nodes[0];
    useGraphStore.getState().selectNode(node.id);
    useGraphStore.getState().removeSelected();
    expect(useGraphStore.getState().nodes).toHaveLength(0);
  });

  it('removes connected edges when node is deleted', () => {
    useGraphStore.getState().addNode('service', { x: 0, y: 0 });
    useGraphStore.getState().addNode('database', { x: 200, y: 0 });
    const [n1, n2] = useGraphStore.getState().nodes;
    useGraphStore.getState().onConnect({ source: n1.id, target: n2.id, sourceHandle: null, targetHandle: null });
    useGraphStore.getState().selectNode(n1.id);
    useGraphStore.getState().removeSelected();
    expect(useGraphStore.getState().nodes).toHaveLength(1);
    expect(useGraphStore.getState().edges).toHaveLength(0);
  });

  it('updates node label', () => {
    useGraphStore.getState().addNode('service', { x: 0, y: 0 });
    const node = useGraphStore.getState().nodes[0];
    useGraphStore.getState().updateNode(node.id, { label: 'Updated Label' });
    expect(useGraphStore.getState().nodes[0].data.label).toBe('Updated Label');
  });

  it('selects and deselects node', () => {
    useGraphStore.getState().addNode('service', { x: 0, y: 0 });
    const node = useGraphStore.getState().nodes[0];
    useGraphStore.getState().selectNode(node.id);
    expect(useGraphStore.getState().selectedNodeId).toBe(node.id);
    useGraphStore.getState().selectNode(null);
    expect(useGraphStore.getState().selectedNodeId).toBeNull();
  });
});
