import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data to AsyncStorage.
 * @param {string} key
 * @param {any} data
 */
export const saveToCache = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Load data from AsyncStorage.
 * @param {string} key - The key under which data is stored.
 * @returns {Promise<any>} - The data retrieved from storage.
 */
export const loadFromCache = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from cache:', error);
    return null;
  }
};
