"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { files_table } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

//so that we can manipulate files in uploadthing.
const utApi = new UTApi();

// since we are using 'use-server', this function is like an api call to the client, so we need to ensure proper usage of this.
export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  // we neeed to find the file AND check if it belongs to the user.
  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found or unauthorized" };
  }

  // delete the file from the database.
  const dbResult = await db
    .delete(files_table)
    .where(eq(files_table.id, fileId));

  //delete the file from uploadthing as well.

  const utapiResult = await utApi.deleteFiles([
    file.url.replace("https://https://7jxpbi7ff7.ufs.sh/f/.io/f/", ""),
  ]);
  // this is the format that uploadthing uses to delete files.

  console.log("utapiResult", utapiResult);
  console.log("dbResult", dbResult);

  const c = await cookies();

  // this tells the client to send an updated content ot the page, we dont need to write anyt extra client side call.
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
