import React from 'react';
import { BottomSheetUI } from './ui/BottomSheet';
import type { TAfroPayProps } from './types';

export { useAfroPay } from './hooks/useAfroPay';

export { AfroPayProvider } from './context/AfroPayContext';

export default function AfroPay(props: TAfroPayProps) {
  return <BottomSheetUI onSuccess={props.onSuccess} />;
}
