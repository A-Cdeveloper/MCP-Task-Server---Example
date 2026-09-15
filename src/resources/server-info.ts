import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerServerInfoResource(server: McpServer) {
  server.registerResource(
    "server-info",
    "server://info",
    {
      description: "Information about the MCP server",
      mimeType: "text/plain",
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: "MCP Task Server: \n version: 1.0.0",
          },
        ],
      };
    },
  );
}
