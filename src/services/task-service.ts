import { prisma } from "../db/prisma";

export async function listTasks() {
  return prisma.task.findMany();
}

export async function createTask(title: string) {
  return prisma.task.create({
    data: { title },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function updateTask(id: string, title: string) {
  return prisma.task.update({
    where: { id },
    data: { title },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({
    where: { id },
  });
}
