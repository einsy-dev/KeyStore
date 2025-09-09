import { createId } from "@paralleldrive/cuid2";
import * as SecureStore from "expo-secure-store";

type IndexI = Map<string, Set<string>>;

class Storage {
  private _index: IndexI = new Map();
  constructor() {
    this._loadIndex();
  }

  private async _loadIndex() {
    const indexString = await SecureStore.getItemAsync("index");
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

  private async _saveIndex() {
    // Convert Map with Sets to a storable array of arrays
    const indexArray = Array.from(this._index.entries()).map(([key, value]) => [key, Array.from(value)]);
    await SecureStore.setItemAsync("index", JSON.stringify(indexArray));
  }

  private async _read(id: string) {
    const item = await SecureStore.getItemAsync(id);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Failed to parse item with id ${id}:`, e);
      return null;
    }
  }

  private async _write(id: string, value: any) {
    await SecureStore.setItemAsync(id, JSON.stringify(value));
    return id;
  }

  private async _delete(id: string) { // What is deleted lost forever
    await SecureStore.deleteItemAsync(id);
  }

  async setIntex(groups: GroupI[]) {
    const newIndex: IndexI = new Map();
    for (let i = 0; i < groups.length; i++) {
      newIndex.set(groups[i].id, new Set());
      for (let j = 0; j < groups[i].keys.length; j++) {
        newIndex.get(groups[i].id)?.add(groups[i].keys[j].id);
      }
    }
    this._index = newIndex;
    this._saveIndex();
  }

  async createGroup(data: Optinal<GroupI, "id" | "keys">) {
    const id = createId();
    data.id = id;
    this._index.set(id, new Set());
    await this._write(id, data);
    await this._saveIndex();
    return id;
  }

  async createKey(groupId: string, data: Optinal<KeyI, "id">) {
    if (!this._index.has(groupId)) {
      console.error(`Group with id ${groupId} not found.`);
      return;
    }
    const id = createId();
    data.id = id;
    this._index.get(groupId)?.add(id);
    await this._write(id, data);
    await this._saveIndex();
    return id;
  }

  async deleteGroup(id: string) {
    const keys = this._index.get(id);
    if (keys) {
      for (const keyId of keys) {
        await this._delete(keyId);
      }
    }
    this._index.delete(id);
    await this._delete(id);
    await this._saveIndex();
  }

  async deleteKey(groupId: string, id: string) {
    this._index.get(groupId)?.delete(id);
    await this._delete(id);
    await this._saveIndex();
  }

  async updateGroup(id: string, data: GroupI) {
    await this._write(id, data);
  }

  async updateKey(id: string, data: KeyI) {
    await this._write(id, data);
  }

  async getGroups(): Promise<GroupI[]> {
    const res: GroupI[] = [];
    for (const [id] of this._index.entries()) {
      if (id) {
        const groupData: GroupI = await this._read(id);
        if (groupData) {
          groupData.keys = await this.getKeys(id);
          res.push(groupData);
        }
      }
    }
    return res;
  }

  async getKeys(groupId: string): Promise<KeyI[]> {
    const res: KeyI[] = [];
    const keyIds = this._index.get(groupId);
    if (keyIds) {
      for (const keyId of keyIds) {
        const keyData = await this._read(keyId);
        if (keyData) res.push(keyData);
      }
    }
    return res;
  }
}

export default new Storage();
