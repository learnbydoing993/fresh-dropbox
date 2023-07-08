import { FreshFile } from "./file.ts";

export interface Folder {
  id: string;
  name: string;
  parentFolder: string;
}

export interface SubContent {
  subFolders: Folder[];
  subFiles: FreshFile[];
}

export interface PageFolders {
  currentFolder: Folder;
  subContent: SubContent;
}