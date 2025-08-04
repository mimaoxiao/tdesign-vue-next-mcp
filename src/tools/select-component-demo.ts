import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from 'node:fs';
import { join } from 'node:path';
import { EXTRACTED_DATA_DIR } from '../utils/constants';

function getComponentDoc(name) {
  const path = join(EXTRACTED_DATA_DIR, 'componentList.json');
  const docList = JSON.parse(fs.readFileSync(path, 'utf-8'));

  const result = docList.find((i) => i.name === name);
  return result?.example || [];
}

/** 获取组件文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    "select-component-demo",
    `获取 TDesign 指定组件的所有demo的简介
      适用场景：
      1. 用户需要查看该组件的示例
      2. 用户需要使用该组件实现某个需求，需要根据demo简介来判断查询哪些demo`,
    { componentName: z.string() },
    async ({ componentName }) => {
      const list = await getComponentDoc(componentName);
      return {
        content: [
          {
            type: "text",
            text: `${componentName} 组件的demo简介：
            ${JSON.stringify(list)}`,
          },
        ],
      };
    },
  );
}

export default registryTool;