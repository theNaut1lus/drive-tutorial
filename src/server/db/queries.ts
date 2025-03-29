import "server-only";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export const QUERIES = {
  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db
      .select()
      .from(folderSchema)
      .where(
        and(eq(folderSchema.ownerId, userId), isNull(folderSchema.parent)),
      );
    return rootFolder[0];
  },

  getAllParentsForFolder: async function (folderId: number) {
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
  },

  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(folderSchema)
      .where(eq(folderSchema.id, folderId));
    if (!folder[0]) {
      throw new Error("Folder not found");
    }
    return folder[0];
  },

  getFolders: async function (folderId: number) {
    return db
      .select()
      .from(folderSchema)
      .where(eq(folderSchema.parent, folderId))
      .orderBy(folderSchema.id);
  },

  getFiles: async function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId))
      .orderBy(filesSchema.id);
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db
      .insert(filesSchema)
      .values({ ...input.file, ownerId: input.userId });
  },
};
