import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function readServerInfo(client: Client) {
  const resource = await client.readResource({
    uri: "server://info",
  });

  console.log("Resource", resource);
}
