import { FreshFile } from "../models/file.ts";
import { Folder } from "../models/folder.ts";

const kv = await Deno.openKv()

export async function saveFolder(folder: Folder): Promise<void> {
  const primaryKey = ["folders", folder.id];
  const byParentKey = ["folders_by_parent_folder", folder.parentFolder, folder.id];
  await kv.atomic()
    .check({ key: primaryKey, versionstamp: null})
    .set(primaryKey, folder)
    .set(byParentKey, folder)
    .commit();
}

export async function deleteFolder(id: string) {
  let res = { ok: false };
  while (!res.ok) {
    const getRes = await kv.get<Folder>(["folders", id]);
    if (getRes.value === null) return;
    res = await kv.atomic()
      .check(getRes)
      .delete(["folders", id])
      .delete(["folders_by_parent_folder", getRes.value.parentFolder, id])
      .commit();
  }
}

export async function getFolder(id: string): Promise<Folder | null> {
  const res = await kv.get<Folder>(["folders", id]);
  return res.value
}

export async function getFoldersByParentId(parentId: string): Promise<Folder[]> {
  const iter = kv.list<Folder>({ prefix: ["folders_by_parent_folder", parentId] });
  const folders = [];
  for await (const { value } of iter) {
    folders.push(value);
  }
  return folders;
}

export async function saveFile(file: FreshFile): Promise<void> {
  const primaryKey = ["files", file.id];
  const byParentKey = ["files_by_parent_folder", file.parentFolder, file.id];
  await kv.atomic()
    .check({ key: primaryKey, versionstamp: null})
    .set(primaryKey, file)
    .set(byParentKey, file)
    .commit();
}

export async function getFile(id: string): Promise<FreshFile | null> {
  const res = await kv.get<FreshFile>(["files", id]);
  return res.value
}

export async function getFilesByParentId(parentId: string): Promise<FreshFile[]> {
  const iter = kv.list<FreshFile>({ prefix: ["files_by_parent_folder", parentId] });
  const files = [];
  for await (const { value } of iter) {
    files.push(value);
  }
  return files;
}

export async function deleteFile(id: string): Promise<void> {
  let res = { ok: false };
  while (!res.ok) {
    const getRes = await kv.get<FreshFile>(["files", id]);
    if (getRes.value === null) return;
    res = await kv.atomic()
      .check(getRes)
      .delete(["files", id])
      .delete(["files_by_parent_folder", getRes.value.parentFolder, id])
      .commit();
  }
}