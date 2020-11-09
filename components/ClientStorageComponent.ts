import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';

export default class ClientStorageComponent {
    STORAGE_SECURE_MOBILE: any;
    STORAGE_ASYNC_MOBILE: any;

    secureMobileStorageAvailable: boolean;

    constructor(components) {
        this.secureMobileStorageAvailable = process.env.PLATFORM === 'mobile';

        this.STORAGE_SECURE_MOBILE = 'mobile-secure';
        this.STORAGE_ASYNC_MOBILE = 'mobile-async';
    }

    /**
     * @param {string} name
     * @param {string} [storageName]
     * @returns {*}
     */
    async get(name, storageName) {
        // TODO storageName = storageName || this.STORAGE_SECURE_MOBILE;
        storageName = this.STORAGE_SECURE_MOBILE;

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_SECURE_MOBILE) {
            return await SecureStore.getItemAsync(name);
        }

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_ASYNC_MOBILE) {
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
    async set(name, value, storageName, expires = null) {
        // TODO storageName = storageName || this.STORAGE_SECURE_MOBILE;
        storageName = this.STORAGE_SECURE_MOBILE;

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_SECURE_MOBILE) {
            await SecureStore.setItemAsync(name, value);
        }

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_ASYNC_MOBILE) {
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
    async remove(name, storageName) {
        // TODO storageName = storageName || this.STORAGE_SECURE_MOBILE;
        storageName = this.STORAGE_SECURE_MOBILE;

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_SECURE_MOBILE) {
            await SecureStore.deleteItemAsync(name);
        }

        if (this.secureMobileStorageAvailable && storageName === this.STORAGE_ASYNC_MOBILE) {
            try {
                await AsyncStorage.removeItem(name)
            } catch(e) {
                // remove error
            }
        }
    }
}
