import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from 'node:fs';
import { join } from 'node:path';
import { EXTRACTED_DATA_DIR } from '../utils/constants';

function getComponentDoc() {
  const tdesignPath = join(EXTRACTED_DATA_DIR, 'componentList.json');
  const docList = JSON.parse(fs.readFileSync(tdesignPath, 'utf-8'));

  return docList.map((i) => ({
    name: i.name,
    desc: i.desc,
  }));
}

/** 获取组件文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    "select-component",
    `获取 TDesign 中各个组件的概述
      适用场景：
      1. 用户给出了示意图或需求，需要确定使用哪种组件比较合适`,
    {},
    async () => {
      const documentation = await getComponentDoc();
      return {
        content: [
          {
            type: "text",
            text: `TDesign中的组件概述：
            ${JSON.stringify(documentation)}`,
          },
        ],
      };
    },
  );
}

export default registryTool;