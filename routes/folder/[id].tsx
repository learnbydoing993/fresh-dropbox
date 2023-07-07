import { PageProps } from "$fresh/server.ts";
import Layout from "../../components/Layout.tsx";

export default function FolderPage(props: PageProps) {
  return (
    <Layout>
      <div class="mt-10">
        Hello {props.params.id}
      </div>
    </Layout>
  );
}