import React from 'react';
import { BottomSheetUI } from './ui/BottomSheet';

export { useAfroPay } from './hooks/useAfroPay';

export { AfroPayProvider } from './context/AfroPayContext';

export default function AfroPay() {
  return <BottomSheetUI />;
}
