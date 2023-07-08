import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { Navbar } from "./Navbar.tsx";
import CreateModal from "../islands/CreateModal.tsx";
import CreateButton from "../islands/CreateButton.tsx";
import { Breadcrumb } from "./Breadcrumbs.tsx";
import { Folder } from "../models/folder.ts";
import FileUpload from "../islands/FileUpload.tsx";

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

        <FileUpload currentFolder={props.folder ? props.folder.id : "home"} />

        {props.children}
      </div>

      <CreateModal isOpen={createModalIsOpen} />
    </>
  );
}