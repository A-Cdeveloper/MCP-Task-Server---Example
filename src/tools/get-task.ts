import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getTaskById } from "../services/task-service";

export function registerGetTaskTool(server: McpServer) {
  server.registerTool(
    "getTask",
    {
      description: "Get a task by id",
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
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(task),
          },
        ],
      };
    },
  );
}
