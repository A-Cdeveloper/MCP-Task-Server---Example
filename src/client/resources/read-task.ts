import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function readTaskById(client: Client, id: string) {
  const resource = await client.readResource({
    uri: `task://${id}`,
  });
  console.log("Resource", resource);
}
