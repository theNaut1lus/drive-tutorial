import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";

export default function Sandbox() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          //this says to the client that they can use this fiunction.
          "use server";
          console.log("sup nerds");

          const folderinsert = await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          const fileinsert = await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
          console.log("Inserted folders:", folderinsert);
          console.log("Inserted files:", fileinsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
