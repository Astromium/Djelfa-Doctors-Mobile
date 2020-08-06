import { AsyncStorage } from 'react-native';

const expiry = 7200000; // 2 hours is milleseconds

const store = async (key, value) => {
    try {

        const item = {
            value,
            createdAt: Date.now()
        }

        await AsyncStorage.setItem(key, JSON.stringify(item))

    } catch (err) {
        console.log(err)
    }
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (!value) return null
        const item = JSON.parse(value);
        if (Date.now() - item.createdAt >= expiry) {
            await AsyncStorage.removeItem(key);
            return null
        }
        return item
    } catch (err) {
        console.log(err)
    }
}

export default {
    store,
    get
}