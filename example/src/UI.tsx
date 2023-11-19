import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AfroPay, { useAfroPay } from 'react-native-afro-pay';

export const UI = () => {
  const { initiatePayment } = useAfroPay();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hi There!</Text>
        <Button title="Open" onPress={() => initiatePayment(90)} />
      </View>

      <AfroPay />
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
