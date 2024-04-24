import CryptoJS from "crypto-js";

const secretKey = process.env.CRYPTO_ENCRYPTION_KEY || 'UF5g0yi7XYShnISimzTWoZfxVaSsUg6J';

const setSecureStorageItem = (key: string, value: any): void => {
    try {
        const stringValue = JSON.stringify(value);
        const encryptedValue = CryptoJS.AES.encrypt(
            stringValue,
            secretKey
        ).toString();

        localStorage.setItem(key, encryptedValue);
    } catch (error) {
        console.error('Error setting secure storage item:', error);
        throw error;
    }
};

const getSecureStorageItem = (key: string): any => {
    try {
        const encryptedValue = localStorage.getItem(key);

        if (!encryptedValue) {
            return null;
        }

        const decryptedValue = CryptoJS.AES.decrypt(
            encryptedValue,
            secretKey
        ).toString(CryptoJS.enc.Utf8);

        // Check if decryptedValue is empty or undefined
        if (!decryptedValue) {
            return null;
        }

        return JSON.parse(decryptedValue);
    } catch (error) {
        console.error('Error getting secure storage item:', error);
        throw error;
    }
};



const removeSecureStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing secure storage item:', error);
        throw error;
    }
};

const clearSecureStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing secure storage:', error);
        throw error;
    }
};
module.exports = { setSecureStorageItem, getSecureStorageItem, removeSecureStorageItem, clearSecureStorage }