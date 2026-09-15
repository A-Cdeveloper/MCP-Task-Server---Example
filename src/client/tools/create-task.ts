import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function createTask(client: Client, title: string) {
  const createTaskResult = await client.callTool({
    name: "createTask",
    arguments: { title },
  });

  // @ts-ignore
  console.log("Task created:", createTaskResult.structuredContent.id);

  return createTaskResult;
}
