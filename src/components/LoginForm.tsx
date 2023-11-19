import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import type { LoginFormInput } from '../types';
import CustomTextInput from './Input/TextInput';
import CustomPasswordInput from './Input/PasswordInput';
import CustomButton from './Button/CustomButton';
import { Spacing } from '../utils/constants';
import { postLogin } from '../services/AuthService';
import { useAfroPayContext } from '../hooks/useAfroPayContext';
import * as storage from '../utils/AsyncStorage';

type TLoginFormProps = {};

export default function LoginForm(_: TLoginFormProps) {
  const { setLoginDetails } = useAfroPayContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginFormInput>({
    email: '',
    password: '',
  });

  const handleChange = (key: keyof LoginFormInput) => (val: string) => {
    setData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (data.email && data.password) {
        const res = await postLogin(data);

        if (res.data && res.data.token) {
          // login is successful
          setLoginDetails(res.data.token);
          storage.storeToken(res.data.token);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <CustomTextInput
        label="Email Address"
        keyboardType="email-address"
        placeholder="xyz@gmail.com"
        value={data.email}
        onChangeText={handleChange('email')}
      />

      <CustomPasswordInput
        label="Password"
        placeholder="********"
        value={data.password}
        onChangeText={handleChange('password')}
      />

      <CustomButton title="Sign In" onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing * 2,
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing * 1.5,
    padding: Spacing,
  },
  logo: {
    width: '100%',
    height: 60,
    objectFit: 'contain',
  },
});
