import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { updateTask } from "../services/task-service";

export function registerUpdateTaskTool(server: McpServer) {
  server.registerTool(
    "updateTask",
    {
      description: "Update a task by id",
      inputSchema: z.object({
        id: z.string(),
        title: z.string(),
      }),
      outputSchema: z.object({
        id: z.string(),
        title: z.string(),
      }),
    },
    async ({ id, title }) => {
      const task = await updateTask(id, title);
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
      task.title = title;

      return {
        content: [
          {
            type: "text",
            text: `Task ${task.id} updated successfully`,
          },
        ],
        structuredContent: {
          id: task.id,
          title: task.title,
        },
      };
    },
  );
}
