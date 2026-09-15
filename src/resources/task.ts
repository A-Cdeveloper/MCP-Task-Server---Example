import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { getTaskById, listTasks } from "../services/task-service";

export function registerTaskResource(server: McpServer) {
  server.registerResource(
    "task",
    new ResourceTemplate("task://{id}", {
      // list: undefined,
      list: async () => {
        const tasks = await listTasks();

        return {
          resources: tasks.map((task) => ({
            uri: `task://${task.id}`,
            name: task.title,
          })),
        };
      },
    }),
    {
      description: "A task by id",
      mimeType: "text/plain",
    },
    async (uri, variables) => {
      const task = await getTaskById(String(variables.id));
      if (!task) {
        throw new Error("Task not found");
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: task.title,
          },
        ],
      };
    },
  );
}
