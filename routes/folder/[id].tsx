import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Layout from "../../components/Layout.tsx";
import { TableFolder } from "../../components/TableFolder.tsx";
import { Folder, PageFolders } from "../../models/folder.ts";
import { getFilesByParentId, getFolder, getFoldersByParentId, saveFolder } from "../../utils/db.ts";


export const handler: Handlers<PageFolders> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const folder = await getFolder(id);

    if (folder === null) {
      return ctx.renderNotFound();
    }

    const subFolders = await getFoldersByParentId(id)
    const subFiles = await getFilesByParentId(id)

    const pageFolders: PageFolders = {
      currentFolder: folder,
      subContent: {
        subFolders,
        subFiles
      }
    }
    return ctx.render(pageFolders);
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const folder = form.get("folder") as string;


    if (folder.length === 0) {
      return new Response("Invalid Content", { status: 400 });
    }

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: folder,
      parentFolder: ctx.params.id
    }
    await saveFolder(newFolder);

    // Redirect user to folder id page.
    const headers = new Headers();
    headers.set("location", `/folder/${newFolder.id}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function FolderPage(props: PageProps<PageFolders>) {
  return (
    <Layout folder={props.data.currentFolder}>
      <TableFolder folders={props.data.subContent.subFolders} files={props.data.subContent.subFiles} />
    </Layout>
  );
}