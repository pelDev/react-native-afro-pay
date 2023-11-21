import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { useAsyncHandler } from '../middlewares/async';
import { getLoggedInUser } from '../services/AuthService';

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

      <View style={styles.spacer} />

      <AmountCard amount={currentAmount} user={user} />

      <View style={styles.spacer} />

      <CustomButton
        title="Pay"
        onPress={handlePay}
        loading={paying}
        disabled={paying}
      />

      <View style={styles.spacer} />

      <Pressable onPress={handleSwitchAccount} disabled={paying}>
        <Text>Switch account</Text>
      </Pressable>
    </View>
  );
};

export const BottomSheetUI = () => {
  const { sheetRef, user, setUser } = useAfroPayContext();

  const snapPoints = useMemo(
    () => [SHEET_POINTS.twentyFive, SHEET_POINTS.fifty, SHEET_POINTS.seventy],
    []
  );

  const httpGetLoggedInUser =
    useAsyncHandler<typeof getLoggedInUser>(getLoggedInUser);

  useEffect(() => {
    if (!user) {
      httpGetLoggedInUser().then((res) => {
        if (res && res.data.user) {
          setUser(res.data.user);
        }
      });
    }
  }, [user, setUser, httpGetLoggedInUser]);

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
    resizeMode: 'contain',
  },
  spacer: {
    height: Spacing,
  },
});
