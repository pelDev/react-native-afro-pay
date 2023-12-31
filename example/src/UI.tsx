import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AfroPay, { useAfroPay } from 'react-native-afro-pay';

export const UI = () => {
  const { initiatePayment } = useAfroPay();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hi There!</Text>
        <Button title="Pay with afropay" onPress={() => initiatePayment(90)} />
      </View>

      <AfroPay onSuccess={() => {}} onClose={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
