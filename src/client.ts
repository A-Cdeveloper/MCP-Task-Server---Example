import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { createTask } from "./client/tools/create-task";
import { listTasks } from "./client/tools/list-tasks";
import { getTask } from "./client/tools/get-task";
import { updateTask } from "./client/tools/update-task";
import { deleteTask } from "./client/tools/delete-task";
import { readServerInfo } from "./client/resources/read-server-info";
import { readTasks } from "./client/resources/read-tasks";
import { readTaskById } from "./client/resources/read-task";
import { reviewTask } from "./client/prompts/review-task";
import { ResourceListChangedNotificationSchema } from "@modelcontextprotocol/sdk/types";

const client = new Client({
  name: "MCP Task Client",
  version: "1.0.0",
  description: "MCP Task Client",
});

const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", "src/server.ts"],
});

async function startClient() {
  await client.connect(transport);
  console.log("MCP Client started");

  // set notification handler for resource list changed
  client.setNotificationHandler(
    ResourceListChangedNotificationSchema,
    async () => {
      console.log("Resources list changed");
    },
  );

  // const tools = await client.listTools();
  // console.log("Tools", tools);

  // const resources = await client.listResources();
  // console.log("Resources", resources);

  // const prompts = await client.listPrompts();
  // console.log("Prompts", prompts);

  /// RESOURCES ////
  //////////////// get server info //////////////////

  //await readServerInfo(client);

  //// read tasks ////
  //await readTasks(client);

  //// read task by id ////
  //await readTaskById(client, "cda5d771-1adb-4d0c-a9bb-0d55c3c2e6f9");

  //// TOOLS ////
  //////////////// create task //////////////////
  const createTaskResult = await createTask(client, "Learn MCP 200000");

  //////////////// list all tasks //////////////////
  //await listTasks(client);

  //////////////// get task //////////////////
  // @ts-ignore
  //await getTask(client, createTaskResult.structuredContent.id);

  //////////////// update task //////////////////
  // await updateTask(
  //   client,
  //   // @ts-ignore
  //   createTaskResult.structuredContent.id,
  //   "Learn MCP in the right way",
  // );

  //////////////// delete task //////////////////
  // await deleteTask(
  //   client,
  //   // @ts-ignore
  //   createTaskResult.structuredContent.id,
  // );

  //////////////// list all tasks //////////////////
  //await listTasks(client);

  //// PROMPTS ////
  //////////////// review task //////////////////
  //await reviewTask(client, "cda5d771-1adb-4d0c-a9bb-0d55c3c2e6f9");
}

startClient();
