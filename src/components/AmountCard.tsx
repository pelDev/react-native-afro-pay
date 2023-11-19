import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TAmountCardProps } from '../types';
import { Text } from 'react-native';
import { COLORS, FontSize, Spacing } from '../utils/constants';

const AmountCard = (props: TAmountCardProps) => {
  const { amount, user } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.sub}>Pay</Text>
      <Text style={styles.amount}>${amount}</Text>
      {user && <Text style={styles.sub}>{user.email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  sub: {
    fontSize: FontSize.normal,
    color: COLORS.lightText,
  },
  amount: {
    fontSize: FontSize.xxLarge,
    color: COLORS.primary,
  },
});

export default AmountCard;
