import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }
  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);
  if (!rootFolder) {
    return (
      <>
        <form
          action={async () => {
            "use server";
            const rootFolderId = await MUTATIONS.onboardUser(session.userId);
            return redirect(`/f/${rootFolderId}`);
          }}
        >
          <Button>Create Root Folder</Button>
        </form>
        <footer>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-gray-400">
                &copy;{new Date().getFullYear()} Sidney Drive. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
