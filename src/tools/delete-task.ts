import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteTask, getTaskById } from "../services/task-service";
import { z } from "zod";

export function registerDeleteTaskTool(server: McpServer) {
  server.registerTool(
    "deleteTask",
    {
      description: "Delete a task by id",
      inputSchema: z.object({
        id: z.string(),
      }),
    },
    async ({ id }) => {
      const task = await getTaskById(id);
      if (!task) {
        return {
          content: [
            {
              type: "text",
              text: `Task ${id} not found`,
            },
          ],
        };
      }
      const deletedTask = await deleteTask(id);

      return {
        content: [
          {
            type: "text",
            text: `Task ${deletedTask.id} deleted successfully`,
          },
        ],
      };
    },
  );
}
