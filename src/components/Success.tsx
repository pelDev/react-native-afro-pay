import React from 'react';
import { StyleSheet } from 'react-native';
import type { TSuccessProps } from '../types';
import { COLORS, FontSize, Spacing } from '../utils/constants';
import { View } from 'react-native';
import { Text } from 'react-native';

const Success = (props: TSuccessProps) => {
  const { message } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>
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
