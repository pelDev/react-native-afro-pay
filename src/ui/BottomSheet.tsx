import React, { useEffect, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
import Success from '../components/Success';
import { useAsyncHandler } from '../middlewares/async';
import { getLoggedInUser } from '../services/AuthService';
import {
  postPaymentQuote,
  postPaymentTransfer,
} from '../services/PaymentService';
import type { TBottomSheetUIProps } from '../types';

type TSheetContentProps = {
  success: string;
  tax: number | null;
  paying: boolean;
  reset: CallableFunction;
  handleQuote: () => Promise<void>;
  handlePay: () => Promise<void>;
};

const SheetContent = (props: TSheetContentProps) => {
  const { success, tax, paying, reset, handlePay, handleQuote } = props;

  const { loading, loggedIn, currentAmount, user, logout } =
    useAfroPayContext();

  const handleSwitchAccount = () => logout();

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

  if (success) {
    return <Success message={success} reset={reset} />;
  }

  return (
    <View style={styles.contentContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.spacer} />

      <AmountCard amount={currentAmount} user={user} tax={tax} />

      <View style={styles.spacer} />

      <CustomButton
        title={!tax ? 'Pay' : 'Confirm'}
        onPress={!tax ? handleQuote : handlePay}
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

export const BottomSheetUI = (props: TBottomSheetUIProps) => {
  const { sheetRef, user, currentAmount, setUser } = useAfroPayContext();

  const snapPoints = useMemo(
    () => [SHEET_POINTS.twentyFive, SHEET_POINTS.fifty, SHEET_POINTS.seventy],
    []
  );

  const [paying, setLoading] = useState(false);
  const [tax, setTax] = useState<number | null>(null);
  const [success, setSuccess] = useState('');

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

  const httpPostPaymentQuote =
    useAsyncHandler<typeof postPaymentQuote>(postPaymentQuote);

  const httpPostPaymentTransfer =
    useAsyncHandler<typeof postPaymentTransfer>(postPaymentTransfer);

  const handleQuote = async () => {
    try {
      setLoading(true);

      const quoteResponse = await httpPostPaymentQuote(+currentAmount);

      if (!quoteResponse) return;

      setTax(quoteResponse.data.amountToPay - +currentAmount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setSuccess('');
    setTax(null);
  };

  const handlePay = async () => {
    if (!tax) return;

    try {
      setLoading(true);

      const transferRresponse = await httpPostPaymentTransfer(
        +currentAmount + tax
      );

      if (transferRresponse) {
        setSuccess(transferRresponse.data?.message);

        setTimeout(() => {
          sheetRef.current?.close();
          reset();
          props.onSuccess();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      onClose={reset}
    >
      <SheetContent
        handlePay={handlePay}
        handleQuote={handleQuote}
        paying={paying}
        reset={reset}
        success={success}
        tax={tax}
      />
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
