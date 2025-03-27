import DriveContents from "~/app/drive-contents";
import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  console.log(parsedFolderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [files, folders, parents] = await Promise.all([
    getFiles(parsedFolderId),
    getFolders(parsedFolderId),
    getAllParentsForFolder(parsedFolderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
