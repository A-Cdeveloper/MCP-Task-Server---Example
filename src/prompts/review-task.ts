import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getTaskById } from "../services/task-service";

export function registerReviewTaskPrompt(server: McpServer) {
  server.registerPrompt(
    "review-task",
    {
      description: "Review a task",
      argsSchema: {
        taskId: z.string(),
      },
    },
    async ({ taskId }) => {
      const task = await getTaskById(String(taskId));
      if (!task) {
        throw new Error("Task not found");
      }
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Review this task:
            
            Task Title: ${task.title}
            Please analyze the task and suggest improvements.`,
            },
          },
        ],
      };
    },
  );
}
