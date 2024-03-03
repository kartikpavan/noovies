import * as SecureStore from "expo-secure-store";

export async function saveToStore(key: string, value: string) {
   await SecureStore.setItemAsync(key, value);
}

export async function getValueFromStore(key: string) {
   let result = await SecureStore.getItemAsync(key);
   return result;
}
