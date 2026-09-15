# MCP Task Server

A practical Model Context Protocol (MCP) server built with TypeScript, the MCP SDK, Prisma, and PostgreSQL.

This project demonstrates the core MCP server concepts through a simple task management system:

**Tools** — execute operations such as creating, updating, deleting, and listing tasks.

**Resources** — expose task data and server information through MCP resource URIs.

**Resource Templates** — expose individual tasks through dynamic URIs such as `task://{id}`.

**Prompts** — provide reusable prompt templates for task review workflows.

**MCP Client** — a small client used to connect to and test the MCP server.

The project is primarily a hands-on learning project for understanding how MCP works internally and how an MCP server can be connected to a real database.

## Tech Stack

TypeScript

Node.js

Model Context Protocol SDK `1.30.0`

Prisma `7.10.0`

PostgreSQL

Zod

`tsx`

## Project Structure

```
src/
├── client/
│   ├── create-task.ts
│   ├── list-tasks.ts
│   ├── get-task.ts
│   ├── update-task.ts
│   ├── delete-task.ts
│   ├── read-server-info.ts
│   └── read-tasks.ts
│
├── db/
│   └── prisma.ts
│
├── generated/
│   └── prisma/
│
├── prompts/
│   └── review-task.ts
│
├── resources/
│   ├── server-info.ts
│   ├── tasks.ts
│   └── task.ts
│
├── services/
│   └── task-service.ts
│
├── tools/
│   ├── create-task.ts
│   ├── list-tasks.ts
│   ├── get-task.ts
│   ├── update-task.ts
│   └── delete-task.ts
│
├── client.ts
└── server.ts
```

## MCP Concepts

### Tools

Tools are callable operations exposed by the MCP server.

The client can request an operation and receive its result.

Implemented tools:

```
createTask
listTasks
getTask
updateTask
deleteTask
```

For example:

```
Client
  ↓
callTool("createTask")
  ↓
MCP Server
  ↓
Task Service
  ↓
PostgreSQL
  ↓
Result
```

Tools can perform both read and write operations. They are not limited to database mutations.

### Resources

Resources expose read-only data through MCP resource URIs.

This project contains:

```
server://info
tasks://all
task://{id}
```

Examples:

```
server://info
```

returns information about the MCP server.

```
tasks://all
```

returns the current tasks.

```
task://{id}
```

returns a specific task.

### Resource Templates

`task://{id}` is implemented as a resource template.

The `{id}` part is dynamic:

```
task://cda5d771-1adb-4d0c-a9bb-0d55c3c2e6f9
```

The server also implements the template `list` callback, allowing clients to discover concrete task resources.

### Prompts

Prompts are reusable prompt templates for specific workflows.

This project includes:

```
review-task
```

The prompt accepts a task ID, loads the task from PostgreSQL, and generates a structured review prompt.

For example:

```
Review this task:

Title: Learn MCP

Please analyze the task and suggest improvements.
```

Prompts are optional; they are useful when an MCP server wants to provide standardized workflows or instructions rather than only data and operations.

## Database

The project uses PostgreSQL with Prisma.

The database contains a simple `Task` model:

```
model Task {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Do not commit `.env` to the repository.

## Installation

Clone the repository and install dependencies:

```
npm install
```

Generate the Prisma client:

```
npx prisma generate
```

Run migrations:

```
npx prisma migrate dev
```

## Running the MCP Server

The server uses the MCP `stdio` transport.

Start it with:

```
npx tsx src/server.ts
```

The server communicates through standard input/output, so normal application logs are written to `stderr`.

## Running the Test Client

The project includes a small MCP client for testing the server.

Run:

```
npx tsx src/client.ts
```

The client connects to the server through `StdioClientTransport` and demonstrates:

connecting to the MCP server

listing tools

calling tools

listing resources

reading resources

listing prompts

retrieving prompts

## MCP Architecture

The overall architecture looks like this:

```
                  ┌──────────────────┐
                  │    MCP Client    │
                  └────────┬─────────┘
                           │
                           │ stdio
                           ▼
                  ┌──────────────────┐
                  │    MCP Server    │
                  ├──────────────────┤
                  │      Tools       │
                  │    Resources     │
                  │     Prompts      │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   Task Service   │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │    PostgreSQL    │
                  └──────────────────┘
```

## What This Project Demonstrates

The goal of this repository is not to build a full production task management application.

The goal is to understand the MCP protocol and its main server primitives by implementing them against a real database.

The project covers:

MCP server initialization

MCP client initialization

stdio transport

MCP tools

tool arguments with Zod

MCP resources

dynamic resources

resource templates

resource template listing

MCP prompts

prompt arguments

database integration

Prisma

PostgreSQL

client/server communication

## License

This project is for learning and demonstration purposes.
