import { FreshFile } from "../models/file.ts";
import { Folder } from "../models/folder.ts";

interface DeleteButtonProps {
  file: FreshFile | null,
  folder: Folder | null
}

export default function DeleteButton({ file, folder } : DeleteButtonProps) {

  const onDeleteFile = async (file: FreshFile) => {
    const url = "/api/file";
    const response = await fetch(url, { method: "DELETE", credentials: "same-origin", body: JSON.stringify(file) });

    if (response.status === 200) {
      window.location.reload();
    }
  }

  const onDeleteFolder = async (folder: Folder) => {
    const url = "/api/folder";
    const response = await fetch(url, { method: "DELETE", credentials: "same-origin", body: JSON.stringify(folder) });

    if (response.status === 200) {
      window.location.reload();
    }
  }

  return(
    <button onClick={() => (file) ? onDeleteFile(file) : onDeleteFolder(folder!) } class="text-red-700">Delete</button>
  );
  
}