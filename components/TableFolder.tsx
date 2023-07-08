import { Folder } from "../models/folder.ts";

interface FoldersProp {
  folders: Folder[];
}

export function TableFolder({folders}: FoldersProp) {
  return (
    <div class="mt-10">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          {folders.map(folder =>
            <tr class="flex justify-between items-center hover:bg-gray-50">
              <th class="px-6 py-4 font-medium text-gray-900">
                <a class="flex items-center gap-1" href={`/folder/${folder.id}`}>
                  <img src="/folder.png" alt="" />
                  <span>{folder.name}</span>
                </a>
              </th>
              <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href={`/folder/${folder.id}`}>View</a><a href="" class="text-primary-700">Delete</a></td>
            </tr>
          )}
          
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
  );
}