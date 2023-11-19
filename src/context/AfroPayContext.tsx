import React from 'react';
import { createContext, useState, type ReactNode, useCallback } from 'react';
import * as storage from '../utils/AsyncStorage';
import type BottomSheet from '@gorhom/bottom-sheet';

const sheetRef = React.createRef<BottomSheet>();

export type AfroPayContextType = {
  loading: boolean;
  loggedIn: boolean;
  token: string | null;
  sheetRef: React.RefObject<BottomSheet>;
  setLoginDetails: (token: string) => void;
  setupStoredCreds: () => void;
};

export const AfroPayContext = createContext<AfroPayContextType | undefined>(
  undefined
);

type TAfroPayProviderProps = {
  children: ReactNode | ReactNode[];
};

export function AfroPayProvider({ children }: TAfroPayProviderProps) {
  const [loading, setLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const setLoginDetails = useCallback(
    (rToken: string | null) => {
      if (rToken) {
        setLoggedIn(true);
        setToken(rToken);
      } else {
        setLoggedIn(false);
        setToken(null);
      }
    },
    [setLoggedIn, setToken]
  );

  const setupStoredCreds = useCallback(async () => {
    try {
      const storedToken = await storage.getToken();

      if (storedToken) {
        setLoggedIn(true);
        setToken(storedToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setLoggedIn, setToken]);

  return (
    <AfroPayContext.Provider
      value={{
        loading,
        loggedIn,
        token,
        sheetRef,
        setupStoredCreds,
        setLoginDetails,
      }}
    >
      {children}
    </AfroPayContext.Provider>
  );
}
