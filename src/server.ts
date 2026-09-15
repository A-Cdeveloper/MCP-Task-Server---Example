import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerListTasksTool } from "./tools/list-tasks";
import { registerGetTaskTool } from "./tools/get-task";
import { registerCreateTaskTool } from "./tools/create-task";
import { registerUpdateTaskTool } from "./tools/update-task";
import { registerDeleteTaskTool } from "./tools/delete-task";
import { registerServerInfoResource } from "./resources/server-info";
import { registerTasksResource } from "./resources/tasks";
import { registerTaskResource } from "./resources/task";
import { registerReviewTaskPrompt } from "./prompts/review-task";

const server = new McpServer({
  name: "MCP Task Server",
  version: "1.0.0",
  description: "MCP Task Manager",
});

const transport = new StdioServerTransport();

// Uncomment this to use a HTTP transport
// const transport = new StreamableHTTPServerTransport({
//   sessionIdGenerator: () => randomUUID(),
// });

async function startServer() {
  await server.connect(transport);

  console.error("MCP server started");
}

// tools
registerListTasksTool(server);
registerGetTaskTool(server);
registerCreateTaskTool(server);
registerUpdateTaskTool(server);
registerDeleteTaskTool(server);

// resources
registerServerInfoResource(server);
registerTasksResource(server);
registerTaskResource(server);

// prompts
registerReviewTaskPrompt(server);

startServer();
