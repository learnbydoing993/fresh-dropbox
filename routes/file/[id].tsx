import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { Navbar } from "../../components/Navbar.tsx";
import { FreshFile } from "../../models/file.ts";
import { getFile } from "../../utils/db.ts";
import { getPublicUrl } from "../../utils/supaUpload.ts";

interface FileDisplay {
  file: FreshFile;
  url: string;
}

export const handler: Handlers<FileDisplay> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const file = await getFile(id);

    if (file === null) {
      return ctx.renderNotFound();
    }

    const url = await getPublicUrl(file);
    const download: FileDisplay = {
      file: file,
      url: url
    }
    return ctx.render(download);
  },
};

export default function FilePage(props: PageProps<FileDisplay>) {

  return (
    <>
      <Navbar />
      
      
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div>File Name: {props.data.file.name}</div>
        <div class="flex items-center justify-center h-screen">
          <embed type="text/html" style="width: 100%; height: 100%;" src={props.data.url}></embed>
        </div>
      </div>
      
    </>
  );
}