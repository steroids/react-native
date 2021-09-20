import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const STORAGE_SECURE = 'secure';
export const STORAGE_ASYNC = 'async';

export default class ClientStorageComponent {

    /**
     * @param {string} name
     * @param {string} [storageName]
     * @returns {*}
     */
    async get(name, storageName = STORAGE_ASYNC) {
        switch (storageName) {
            case STORAGE_SECURE: {
                return EncryptedStorage.getItem(name);
            }
            case STORAGE_ASYNC:
            default: {
                return AsyncStorage.getItem(name);
            }
        }
    }

    /**
     * @param {string} name
     * @param {*} value
     * @param {string} [storageName]
     * @param {number|null} [expires]
     * TODO expires isn't supported by SecureStore
     */
    async set(name, value, storageName = STORAGE_ASYNC, expires = null) {
        switch (storageName) {
            case STORAGE_SECURE: {
                return EncryptedStorage.setItem(name, value);
            }
            case STORAGE_ASYNC:
            default: {
                return AsyncStorage.setItem(name, value);
            }
        }
    }

    /**
     * @param {string} name
     * @param {string} [storageName]
     */
    async remove(name, storageName = STORAGE_ASYNC) {
        switch (storageName) {
            case STORAGE_SECURE: {
                return EncryptedStorage.removeItem(name);
            }
            case STORAGE_ASYNC:
            default: {
                return AsyncStorage.removeItem(name);
            }
        }
    }

    /**
     * @param {string} [storageName]
     * @param {string} [clearKeys]
     * TODO SecureStore API doesn't include clear all method
     */
    async clear(storageName = STORAGE_SECURE, clearKeys = []) {
        switch (storageName) {
            case STORAGE_SECURE: {
                if (clearKeys.length) {
                    clearKeys.forEach(key => {
                        this.remove(key, STORAGE_SECURE);
                    });
                } else {
                    await EncryptedStorage.clear();
                }
                break;
            }
            case STORAGE_ASYNC:
            default: {
                if (clearKeys.length) {
                    clearKeys.forEach(key => {
                        this.remove(key);
                    });
                } else {
                    await AsyncStorage.clear();
                }
            }
        }
    }
}
