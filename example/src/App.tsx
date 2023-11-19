import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AfroPayProvider } from 'react-native-afro-pay';
import { UI } from './UI';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <AfroPayProvider>
      <GestureHandlerRootView style={styles.container}>
        <UI />
      </GestureHandlerRootView>
    </AfroPayProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
