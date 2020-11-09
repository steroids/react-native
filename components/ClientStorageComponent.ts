import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_SECURE = 'secure';
export const STORAGE_ASYNC = 'async';

export default class ClientStorageComponent {

    /**
     * @param {string} name
     * @param {string} [storageName]
     * @returns {*}
     */
    async get(name, storageName = STORAGE_SECURE) {
        if (storageName === STORAGE_SECURE) {
            return await SecureStore.getItemAsync(name);
        }

        if (storageName === STORAGE_ASYNC) {
            try {
                return await AsyncStorage.getItem(name)
            } catch(e) {
                // read error
            }
        }

        return null;
    }

    /**
     * @param {string} name
     * @param {*} value
     * @param {string} [storageName]
     * @param {number|null} [expires]
     * TODO expires isn't supported by SecureStore
     */
    async set(name, value, storageName = STORAGE_SECURE, expires = null) {
        if (storageName === STORAGE_SECURE) {
            await SecureStore.setItemAsync(name, value);
        }

        if (storageName === STORAGE_ASYNC) {
            try {
                await AsyncStorage.setItem(name, value)
            } catch(e) {
                // save error
            }
        }
    }

    /**
     * @param {string} name
     * @param {string} [storageName]
     */
    async remove(name, storageName = STORAGE_SECURE) {
        if (storageName === STORAGE_SECURE) {
            await SecureStore.deleteItemAsync(name);
        }

        if (storageName === STORAGE_ASYNC) {
            try {
                await AsyncStorage.removeItem(name)
            } catch(e) {
                // remove error
            }
        }
    }
}
