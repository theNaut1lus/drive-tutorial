import "server-only";

import {
  bigint,
  int,
  text,
  singlestoreTable,
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";
import { url } from "inspector";
import { SignalZero } from "lucide-react";

//to add the prefix for every table created on singlestore DB.
export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    //singlestore only wants bigint as it is built for scale in mind, initial push works, but subsequent fail. hence bigint.

    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (tempTable) => {
    return [index("parent_index").on(tempTable.parent)];
  },
);

export type DB_filetype = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type DB_folderType = typeof folders_table.$inferSelect;
