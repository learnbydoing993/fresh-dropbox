import { Handlers } from "$fresh/server.ts";
import { FreshFile } from "../../models/file.ts";
import { saveFile } from "../../utils/db.ts";
import { uploadFile } from "../../utils/supaUpload.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const form = await req.formData();
    const file = form.get("file") as Blob;
    const id = form.get("id") as string;
    const name = form.get("name") as string;
    const parentFolder = form.get("parentFolder") as string;

    const path = await uploadFile(file, id, parentFolder);

    if (!path) {
      new Response("Failed to upload file", { status: 500 });
    }

    const newFile: FreshFile = {
      id: id,
      name: name,
      path: path!,
      parentFolder: parentFolder
    }
    await saveFile(newFile);

    return new Response("Upload successful", { status: 200 });
  },
};