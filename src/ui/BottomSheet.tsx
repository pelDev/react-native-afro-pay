import React, { useContext, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  AfroPayContext,
  type AfroPayContextType,
} from '../context/AfroPayContext';
import { COLORS, SHEET_POINTS, Spacing } from '../utils/constants';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Text,
  Pressable,
} from 'react-native';
import { useAfroPayContext } from '../hooks/useAfroPayContext';
import LoginForm from '../components/LoginForm';
import AmountCard from '../components/AmountCard';
import CustomButton from '../components/Button/CustomButton';

const SheetContent = () => {
  const { loading, loggedIn, currentAmount, user, logout } = useContext(
    AfroPayContext
  ) as AfroPayContextType;

  const handleSwitchAccount = () => logout();

  const [paying, setLoading] = useState(false);
  const handlePay = async () => {
    setLoading(true);

    setLoading(false);
  };

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
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <AmountCard amount={currentAmount} user={user} />

      <CustomButton
        title="Pay"
        onPress={handlePay}
        loading={paying}
        disabled={paying}
      />

      <Pressable onPress={handleSwitchAccount} disabled={paying}>
        <Text>Switch account</Text>
      </Pressable>
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
    width: '100%',
    alignItems: 'center',
    padding: 24,
    gap: Spacing,
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: '#ccc',
  },
  logo: {
    width: '100%',
    height: 60,
    objectFit: 'contain',
  },
});
