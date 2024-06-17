import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStoreService {

  public async getStore(key: string) {
    let toResponse = null
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const objToTransform = jsonValue != null ? JSON.parse(jsonValue) : null;
      toResponse = objToTransform;
    } catch (err) {
      // error reading value
      console.log(err)
    }

    return toResponse;
  }

  public async setStore(key: string, value: any) {
    let toResponse = null

    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('daily-shop', jsonValue);
      toResponse = jsonValue;
    } catch (err) {
      // saving error
      console.log(err)
    }

    return toResponse;
  }
}