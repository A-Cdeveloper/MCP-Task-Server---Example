import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listTasks } from "../services/task-service";

export function registerTasksResource(server: McpServer) {
  server.registerResource(
    "tasks",
    "tasks://all",
    {
      description: "Tasks",
      mimeType: "text/plain",
    },
    async (uri) => {
      const tasks = await listTasks();
      const tasksText = tasks.map((task) => `${task.title}`).join("\n");
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: tasksText,
          },
        ],
      };
    },
  );
}
