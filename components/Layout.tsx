import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { Navbar } from "./Navbar.tsx";
import CreateModal from "../islands/CreateModal.tsx";
import CreateButton from "../islands/CreateButton.tsx";
import { Breadcrumb } from "./Breadcrumbs.tsx";
import { Folder } from "../models/folder.ts";

interface LayoutProps {
  folder: Folder | null;
  children: ComponentChildren;
}

export default function Layout(props: LayoutProps) {
  const createModalIsOpen = useSignal(false);
  
  return (
    <>
      <Navbar />
      
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        <Breadcrumb folder={props.folder} />
        
        <div class="mt-5">
          <CreateButton isOpen={createModalIsOpen} />
        </div>

        <div class="mx-auto mt-10">
          <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div class="space-y-1 text-center">
              <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div class="text-gray-600"><a href="#" class="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
              <p class="text-sm text-gray-500">PDF, SVG, PNG, JPG or GIF</p>
            </div>
            <input id="example5" type="file" class="sr-only" />
          </label>
        </div>

        {props.children}
      </div>

      <CreateModal isOpen={createModalIsOpen} />
    </>
  );
}