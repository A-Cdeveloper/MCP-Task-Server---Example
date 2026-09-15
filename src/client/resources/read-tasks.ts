import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function readTasks(client: Client) {
  const resource = await client.readResource({
    uri: "tasks://all",
  });
  console.log("Resource", resource);
}
