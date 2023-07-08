import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { TableFolder } from "../components/TableFolder.tsx";
import { Folder, SubContent } from "../models/folder.ts";
import { getFilesByParentId, getFoldersByParentId, saveFolder } from "../utils/db.ts";

export const handler: Handlers<SubContent> = {
  async GET(_req, ctx) {
    const subFolders = await getFoldersByParentId('home')
    const subFiles = await getFilesByParentId('home');

    const subContent: SubContent = {
      subFolders,
      subFiles
    }
    return ctx.render(subContent);
  },

  async POST(req, _ctx) {
    const form = await req.formData();
    const folder = form.get("folder") as string;

    if (folder.length === 0) {
      return new Response("Invalid Content", { status: 400 });
    }

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: folder,
      parentFolder: 'home'
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

export default function Home(props: PageProps<SubContent>) {
  return (
    <Layout folder={null}>
      <TableFolder folders={props.data.subFolders} files={props.data.subFiles} />
    </Layout>
  );
}
