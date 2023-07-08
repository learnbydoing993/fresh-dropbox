export interface Folder {
  id: string;
  name: string;
  parentFolder: string;
}

export interface PageFolders {
  currentFolder: Folder;
  subFolders: Folder[];
}