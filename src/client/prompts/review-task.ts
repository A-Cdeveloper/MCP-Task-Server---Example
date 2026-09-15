import { Client } from "@modelcontextprotocol/sdk/client";

export async function reviewTask(client: Client, taskId: string) {
  const result = await client.getPrompt({
    name: "review-task",
    arguments: { taskId },
  });
  // console.log("Review task result", result);

  console.dir(result, { depth: null });
}
