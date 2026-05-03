import ServiceNode from './ServiceNode';
import DatabaseNode from './DatabaseNode';
import QueueNode from './QueueNode';
import ApiGatewayNode from './ApiGatewayNode';
import FrontendNode from './FrontendNode';
import StorageNode from './StorageNode';
import ExternalNode from './ExternalNode';
import AuthNode from './AuthNode';
import CacheNode from './CacheNode';
import type { NodeTypes } from '@xyflow/react';

export const nodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  queue: QueueNode,
  apiGateway: ApiGatewayNode,
  frontend: FrontendNode,
  storage: StorageNode,
  external: ExternalNode,
  auth: AuthNode,
  cache: CacheNode,
};
