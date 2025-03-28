import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { eq } from "drizzle-orm";

export default async function Sandbox() {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));
  console.log("folders", folders);
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          console.log("sup nerds");
          const user = await auth();
          if (!user.userId) throw new Error("Unauthorized");

          const rootFolder = await db
            .insert(folders_table)
            .values({ name: "root", ownerId: user.userId, parent: null })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));
          await db.insert(folders_table).values(insertableFolders);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
