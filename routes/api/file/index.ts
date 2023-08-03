import { Handlers } from "$fresh/server.ts";
import { FreshFile } from "../../../models/file.ts";
import { deleteFile } from "../../../utils/db.ts";
import { removeFile } from "../../../utils/supaUpload.ts";

export const handler: Handlers = {
  async DELETE(req, _ctx) {
    const file = await req.json() as FreshFile

    await removeFile(file);
    await deleteFile(file.id);
    
    return new Response("Removed file successfully", { status: 200 });
  },
};