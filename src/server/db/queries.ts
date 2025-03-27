import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(folderSchema)
      .where(eq(folderSchema.id, currentId));
    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }
    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}

export async function getFolders(folderId: number) {
  return db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, folderId));
}

export async function getFiles(folderId: number) {
  return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
}
