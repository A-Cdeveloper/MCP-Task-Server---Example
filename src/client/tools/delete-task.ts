import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function deleteTask(client: Client, id: string) {
  const deleteTaskResult = await client.callTool({
    name: "deleteTask",
    arguments: {
      id,
    },
  });

  // @ts-ignore
  console.log("Task deleted:", deleteTaskResult.content[0]?.text);

  return deleteTaskResult;
}
