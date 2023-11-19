import { useAfroPayContext } from './useAfroPayContext';

export function useAfroPay() {
  const { sheetRef, setupStoredCreds, setCurrentAmount } = useAfroPayContext();

  const initiatePayment = (amount: number) => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(1);
      setCurrentAmount(amount);
      setupStoredCreds();
    }
  };

  return {
    initiatePayment,
  };
}
