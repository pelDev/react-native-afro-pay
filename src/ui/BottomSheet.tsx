import React, { useContext, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  AfroPayContext,
  type AfroPayContextType,
} from '../context/AfroPayContext';
import { COLORS, SHEET_POINTS } from '../utils/constants';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useAfroPayContext } from '../hooks/useAfroPayContext';
import LoginForm from '../components/LoginForm';

const SheetContent = () => {
  const { loading, loggedIn } = useContext(
    AfroPayContext
  ) as AfroPayContextType;

  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    );
  }

  if (!loggedIn) {
    return <LoginForm />;
  }

  return (
    <View style={styles.contentContainer}>
      <Text>Logged In! Confirm Payment</Text>
    </View>
  );
};

export const BottomSheetUI = () => {
  const { sheetRef } = useAfroPayContext();

  const snapPoints = useMemo(
    () => [SHEET_POINTS.twentyFive, SHEET_POINTS.fifty, SHEET_POINTS.seventy],
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
    >
      <SheetContent />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: 'auto',
    alignItems: 'center',
    padding: 24,
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: '#ccc',
  },
});
