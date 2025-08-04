import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from 'node:fs';
import { join } from 'node:path';
import { EXTRACTED_DATA_DIR } from '../utils/constants';

function getComponentDoc(path: string) {
  let realPath = path;

  if (realPath.includes('EXTRACTED_DATA_DIR')) {
    realPath = realPath.replace('EXTRACTED_DATA_DIR', '');
    realPath = join(EXTRACTED_DATA_DIR, realPath);
  }

  if (!realPath.endsWith('.vue')) {
    realPath += '.vue';
  }
  const file = fs.readFileSync(realPath, 'utf-8');
  return file.toString();
}

/** 获取组件文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    "get-component-demo",
    `获取 TDesign 指定组件的指定demo的代码
      适用场景：
      1. 用户需要查看该组件的指定demo代码`,
    { componentName: z.string(), demoPath: z.string() },
    async ({ componentName, demoPath }) => {
      const file = await getComponentDoc(demoPath);
      return {
        content: [
          {
            type: "text",
            text: `${componentName} 组件的demo示例：
${file}`,
          },
        ],
      };
    },
  );
}

export default registryTool;