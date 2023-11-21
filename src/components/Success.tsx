import React from 'react';
import { StyleSheet } from 'react-native';
import type { TSuccessProps } from '../types';
import { COLORS, FontSize, Spacing } from '../utils/constants';
import { View } from 'react-native';
import { Text } from 'react-native';
import CustomButton from './Button/CustomButton';
import { useAfroPayContext } from '../hooks/useAfroPayContext';

const Success = (props: TSuccessProps) => {
  const { message, reset } = props;

  const { sheetRef } = useAfroPayContext();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>

      <CustomButton
        title="Close"
        onPress={() => {
          sheetRef.current?.close();
          reset();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing,
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.inputBg,
    padding: Spacing * 1.5,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Spacing,
  },
  text: {
    fontSize: FontSize.xxLarge,
  },
});

export default Success;
