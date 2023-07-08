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
      .delete(["folders_by_parent_folder", getRes.value.parentFolder])
      .commit();
  }
}

export async function testingSave(folder: Folder): Promise<void> {
  await kv.set(["folders", "Dance", "baby", folder.id], folder);
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

export async function listAll(): Promise<Folder[]> {
  const iter = kv.list<Folder>({ prefix: ["folders"] });
  const folders = [];
  for await (const { value } of iter) {
    folders.push(value);
  }
  return folders;
}

export async function deleteAll(id: string) {
  await kv.delete(["folders", "Dance", "baby", id]);
}