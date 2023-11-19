import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'AFRO-PAY-token';

async function storeToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function getToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export { storeToken, removeToken, getToken };
