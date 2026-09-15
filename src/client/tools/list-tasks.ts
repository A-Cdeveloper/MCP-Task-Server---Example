import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function listTasks(client: Client) {
  const result = await client.callTool({
    name: "listTasks",
  });

  // @ts-ignore
  console.log("Tasks:", JSON.parse(result.content[0]?.text ?? "[]"));

  return result;
}
