import { Handlers } from "$fresh/server.ts";
import { Folder } from "../../../models/folder.ts";
import { deleteFile, deleteFolder, getFilesByParentId, getFoldersByParentId } from "../../../utils/db.ts";
import { removeFile } from "../../../utils/supaUpload.ts";

async function deleteAllFolder(folder: Folder) {
    const subFolders = await getFoldersByParentId(folder.id)
    const subFiles = await getFilesByParentId(folder.id)

    for (const file of subFiles) {
      await removeFile(file);
      await deleteFile(file.id);
    }
    
    await deleteFolder(folder.id);

    for (const subFolder of subFolders) {
      await deleteAllFolder(subFolder);
    }
}

export const handler: Handlers = {
  async DELETE(req, _ctx) {
    const folder = await req.json() as Folder

    await deleteAllFolder(folder);

    return new Response("Removed folder", { status: 200 });
  },
};