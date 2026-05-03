import {
  Server, Database, Router, Waypoints,
  Monitor, HardDrive, Globe, Shield, Zap,
  type LucideIcon,
} from 'lucide-react';
import type { NodeType } from '../../types/nodes';

export interface NodeDefinition {
  type: NodeType;
  label: string;
  icon: LucideIcon;
  color: string;
  fillColor: string;
  defaultLabel: string;
  ports: { input?: boolean; output?: boolean };
}

export const NODE_DEFINITIONS: Record<NodeType, NodeDefinition> = {
  service: {
    type: 'service',
    label: 'Service',
    icon: Server,
    color: '#22d3ee',
    fillColor: 'rgba(8, 51, 68, 0.4)',
    defaultLabel: 'New Service',
    ports: { input: true, output: true },
  },
  database: {
    type: 'database',
    label: 'Database',
    icon: Database,
    color: '#a78bfa',
    fillColor: 'rgba(76, 29, 149, 0.4)',
    defaultLabel: 'New Database',
    ports: { input: true },
  },
  queue: {
    type: 'queue',
    label: 'Message Queue',
    icon: Waypoints,
    color: '#fb923c',
    fillColor: 'rgba(251, 146, 60, 0.15)',
    defaultLabel: 'New Queue',
    ports: { input: true, output: true },
  },
  apiGateway: {
    type: 'apiGateway',
    label: 'API Gateway',
    icon: Router,
    color: '#34d399',
    fillColor: 'rgba(6, 78, 59, 0.4)',
    defaultLabel: 'API Gateway',
    ports: { input: true, output: true },
  },
  frontend: {
    type: 'frontend',
    label: 'Frontend',
    icon: Monitor,
    color: '#fbbf24',
    fillColor: 'rgba(120, 53, 15, 0.3)',
    defaultLabel: 'Frontend App',
    ports: { output: true },
  },
  storage: {
    type: 'storage',
    label: 'Storage',
    icon: HardDrive,
    color: '#60a5fa',
    fillColor: 'rgba(30, 58, 138, 0.4)',
    defaultLabel: 'Storage Bucket',
    ports: { input: true },
  },
  external: {
    type: 'external',
    label: 'External',
    icon: Globe,
    color: '#94a3b8',
    fillColor: 'rgba(30, 41, 59, 0.5)',
    defaultLabel: 'External Service',
    ports: { input: true, output: true },
  },
  auth: {
    type: 'auth',
    label: 'Auth',
    icon: Shield,
    color: '#fb7185',
    fillColor: 'rgba(136, 19, 55, 0.4)',
    defaultLabel: 'Auth Provider',
    ports: { input: true, output: true },
  },
  cache: {
    type: 'cache',
    label: 'Cache',
    icon: Zap,
    color: '#f472b6',
    fillColor: 'rgba(131, 24, 67, 0.4)',
    defaultLabel: 'Redis Cache',
    ports: { input: true, output: true },
  },
};

export const ALL_NODE_TYPES: NodeType[] = Object.keys(NODE_DEFINITIONS) as NodeType[];
