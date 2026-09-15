import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function updateTask(client: Client, id: string, title: string) {
  const updateTaskResult = await client.callTool({
    name: "updateTask",
    arguments: {
      id,
      title,
    },
  });

  // @ts-ignore
  console.log("Task updated:", updateTaskResult.structuredContent);

  return updateTaskResult;
}
