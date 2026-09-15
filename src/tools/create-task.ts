import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";
import { createTask } from "../services/task-service";

export function registerCreateTaskTool(server: McpServer) {
  server.registerTool(
    "createTask",
    {
      description: "Create a new task",
      inputSchema: z.object({
        title: z.string(),
      }),
      outputSchema: z.object({
        id: z.string(),
      }),
    },
    async ({ title }) => {
      const newTask = await createTask(title);
      // send resource list changed to notify the client that the resources have changed
      server.sendResourceListChanged();
      return {
        content: [
          {
            type: "text",
            text: `Task created ${newTask.id} - ${newTask.title}`,
          },
        ],
        structuredContent: {
          id: newTask.id,
        },
      };
    },
  );
}
