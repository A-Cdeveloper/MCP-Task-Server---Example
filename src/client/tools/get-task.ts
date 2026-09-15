import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function getTask(client: Client, id: string) {
  const task = await client.callTool({
    name: "getTask",
    // @ts-ignore
    arguments: { id },
  });
  // @ts-ignore
  console.log("Task:", task.content[0]?.text);

  return task;
}
