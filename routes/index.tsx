import { Handlers } from "$fresh/server.ts";
import CreateButton from "../islands/CreateButton.tsx";
import Layout from "../components/Layout.tsx";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const form = await req.formData();
    const folder = form.get("folder")?.toString();

    // Store new folder in db

    // Redirect user to folder id page.
    const headers = new Headers();
    headers.set("location", "/folder/someid");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function Home() {
  return (
    <Layout>
      <div class="mt-10">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900 flex items-center gap-1">
                <img src="/folder.png" alt="" />
                <span>Books</span>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900 flex items-center gap-1">
                <img src="/folder.png" alt="" />
                <span>Taxes</span>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900 flex items-center gap-1">
                <img src="/folder.png" alt="" />
                <span>School</span>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900 flex items-center gap-1">
                <img src="/file.png" alt="" />
                <span>CV.pdf</span>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900 flex items-center gap-1">
                <img src="/file.png" alt="" />
                <span>passwords.txt</span>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
