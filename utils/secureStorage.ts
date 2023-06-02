import * as SecureStore from 'expo-secure-store';
export class SecureStorage {

    save = (key: string, value: string) => {
        let promise = new Promise((resolve, reject) => {
            SecureStore.setItemAsync(key, value).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error)
            })
        })
        return promise;
    }

    get = (key: string):Promise<string|null> => {
        let promise = new Promise<string|null>((resolve, reject) => {
            SecureStore.getItemAsync(key).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error)
            })
        })
        return promise;
    }

    delete = (key: string) => {
        let promise = new Promise((resolve, reject) => {
            SecureStore.deleteItemAsync(key).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(undefined)
            })
        })
        return promise;
    }
}