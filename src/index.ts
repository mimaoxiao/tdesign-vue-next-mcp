#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import registerTools from './tools/index';

function main() {
  // 创建 MCP 服务器 
  const server = new McpServer(
    {
      name: 'TDesign Components MCP',
      version: process.env.VERSION || '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        prompts: {},
      },
      instructions: `
      你是一个专业的 TDesign 组件库专家助手，具有以下能力：
      1. 可以查询指定名称组件的入参文档
      2. 可以获取 TDesign 中各个组件的概述
      3. 可以根据组件名称获取 TDesign 组件的使用示例路径
      4. 可以根据路径获取 TDesign 组件的使用示例代码`,
    }
  );

  /** 注册工具 */
  registerTools(server);

  /** 注册 prompt */
  // registerPrompts(server);

  // 启动服务器
  const transport = new StdioServerTransport();
  server.connect(transport);
}

main();
