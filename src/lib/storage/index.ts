import { createId } from "@paralleldrive/cuid2";
import * as SecureStore from "expo-secure-store";

class Storage {
  private _index: IndexI = new Map();
  constructor() {
    this._loadIndex();
  }

  private _loadIndex() {
    const indexString = SecureStore.getItem("index");
    if (indexString) {
      try {
        const parsedIndex = JSON.parse(indexString);
        if (Array.isArray(parsedIndex)) {
          this._index = new Map(parsedIndex.map(([key, value]) => [key, new Set(value)]));
        }
      } catch (e) {
        console.error("Failed to load index:", e);
      }
    }
  }

  private _saveIndex() {
    const indexArray = Array.from(this._index.entries()).map(([key, value]) => [key, Array.from(value)]);
    SecureStore.setItem("index", JSON.stringify(indexArray));
  }

  private _read(id: string) {
    const item = SecureStore.getItem(id);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Failed to parse item with id ${id}:`, e);
      return null;
    }
  }

  private _write(id: string, value: any) {
    SecureStore.setItem(id, JSON.stringify(value));
    return id;
  }

  private _delete(id: string) {
    // What is deleted lost forever
    return SecureStore.deleteItemAsync(id);
  }

  setIntex(groups: { [id: string]: GroupI }) {
    const newIndex: IndexI = new Map();
    for (let groupId in groups) {
      newIndex.set(groups[groupId].id, new Set());
      for (let keyId in groups[groupId].keys) {
        newIndex.get(groups[groupId].id)?.add(groups[groupId].keys[keyId].id);
      }
    }
    this._index = newIndex;
    this._saveIndex();
  }

  createGroup(data: Optinal<GroupI, "id" | "keys">) {
    const id = createId();
    data.id = id;
    this._index.set(id, new Set());
    this._write(id, data);
    this._saveIndex();
    return id;
  }

  createKey(groupId: string, data: Optinal<KeyI, "id">) {
    if (!this._index.has(groupId)) {
      console.error(`Group with id ${groupId} not found.`);
      return;
    }
    const id = createId();
    data.id = id;
    this._index.get(groupId)?.add(id);
    this._write(id, data);
    this._saveIndex();
    return id;
  }

  deleteGroup(id: string) {
    const keys = this._index.get(id);
    if (keys) {
      for (const keyId of keys) {
        this._delete(keyId);
      }
    }
    this._index.delete(id);
    this._delete(id);
    this._saveIndex();
  }

  deleteKey(groupId: string, id: string) {
    this._index.get(groupId)?.delete(id);
    this._delete(id);
    this._saveIndex();
  }

  updateGroup(data: GroupI) {
    this._write(data.id, data);
  }

  updateKey(data: KeyI) {
    this._write(data.id, data);
  }

  getGroups(): { [id: string]: GroupI } {
    const res: { [id: string]: GroupI } = {};
    for (const [id] of this._index.entries()) {
      if (id) {
        const groupData: GroupI = this._read(id);
        if (groupData) {
          groupData.keys = this.getKeys(id);
          res[id] = groupData;
        }
      }
    }
    return res;
  }

  getKeys(groupId: string): { [id: string]: KeyI } {
    const res: { [id: string]: KeyI } = {};
    const keyIds = this._index.get(groupId);
    if (keyIds) {
      for (const keyId of keyIds) {
        const keyData = this._read(keyId);
        if (keyData) res[keyId] = keyData;
      }
    }
    return res;
  }
}

export default new Storage();
