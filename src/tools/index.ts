import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import getComponentProp from "./get-component-prop.ts";
import getComponentDemo from './get-component-demo.ts';
import selectComponent from './select-component.ts';
import selectComponentDemo from './select-component-demo.ts';

export default function registryTools(server: McpServer) {
  [getComponentProp, getComponentDemo, selectComponent, selectComponentDemo].forEach((registryFn) => {
    registryFn(server)
  })
}
