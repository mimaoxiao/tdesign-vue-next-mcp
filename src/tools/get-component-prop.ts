import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from 'node:fs';
import { join } from 'node:path';
import { EXTRACTED_DATA_DIR } from '../utils/constants';

function getComponentDoc(name) {
  const tdesignPath = join(EXTRACTED_DATA_DIR, 'componentProp.json');
  const docList = JSON.parse(fs.readFileSync(tdesignPath, 'utf-8'));

  return docList.find((i) => {
    return i.name === name;
  });
}

/** 获取组件文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    "get-component-prop",
    `获取 TDesign 特定组件的入参文档
      适用场景：
      1. 用户需要查看该组件的入参
      2. 用户需要解决组件入参相关的问题，例如入参错误或入参不存在`,
    { componentName: z.string() },
    async ({ componentName }) => {
      const { propsData } = await getComponentDoc(componentName);
      return {
        content: [
          {
            type: "text",
            text: `${componentName} 组件的入参文档：${propsData}`,
          },
        ],
      };
    },
  );
}

export default registryTool;