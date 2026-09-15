import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listTasks } from "../services/task-service";

export function registerListTasksTool(server: McpServer) {
  server.registerTool(
    "listTasks",
    {
      description: "List all Tasks",
    },
    async () => {
      const tasks = await listTasks();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tasks),
          },
        ],
      };
    },
  );
}
