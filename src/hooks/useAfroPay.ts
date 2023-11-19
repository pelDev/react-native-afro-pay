import { useAfroPayContext } from './useAfroPayContext';

export function useAfroPay() {
  const { sheetRef, setupStoredCreds } = useAfroPayContext();

  const initiatePayment = (_: number) => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(2);

      setupStoredCreds();
    }
  };

  return {
    initiatePayment,
  };
}
