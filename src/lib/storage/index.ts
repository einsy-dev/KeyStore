import * as SecureStore from "expo-secure-store";

class Storage {
	set(id: number | string, data: any) {
		return SecureStore.setItem(String(id), JSON.stringify(data));
	}

	get(id: number | string) {
		return JSON.parse(SecureStore.getItem(String(id))!)
	}

	del(id: number | string,) {
		return SecureStore.deleteItemAsync(String(id))
	}
}

export default new Storage()