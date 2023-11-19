import React from 'react';
import { createContext, useState, type ReactNode, useCallback } from 'react';
import * as storage from '../utils/AsyncStorage';
import type BottomSheet from '@gorhom/bottom-sheet';
import type { User } from '../types';
import { getLoggedInUser } from '../services/AuthService';

const sheetRef = React.createRef<BottomSheet>();

export type AfroPayContextType = {
  loading: boolean;
  loggedIn: boolean;
  token: string | null;
  sheetRef: React.RefObject<BottomSheet>;
  currentAmount: number;
  user: User | null;
  setCurrentAmount: (amount: number) => void;
  setLoginDetails: (data: any) => void;
  setupStoredCreds: () => void;
  logout: () => void;
};

export const AfroPayContext = createContext<AfroPayContextType | undefined>(
  undefined
);

type TAfroPayProviderProps = {
  children: ReactNode | ReactNode[];
};

export function AfroPayProvider({ children }: TAfroPayProviderProps) {
  const [loading, setLoading] = useState(true);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setLoginDetails = useCallback(
    (data: any) => {
      if (data?.token) {
        setLoggedIn(true);
        setToken(data.token);
        setUser(data.user);
      } else {
        setLoggedIn(false);
        setToken(null);
        setUser(null);
      }
    },
    [setLoggedIn, setToken, setUser]
  );

  const setupStoredCreds = useCallback(async () => {
    try {
      const storedToken = await storage.getToken();

      if (storedToken) {
        setLoggedIn(true);
        setToken(storedToken);

        const res = await getLoggedInUser();

        if (res.data.user) {
          setUser(res.data.user);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setLoggedIn, setToken]);

  const logout = useCallback(async () => {
    setLoginDetails(null);
    await storage.removeToken();
  }, [setLoginDetails]);

  return (
    <AfroPayContext.Provider
      value={{
        loading,
        loggedIn,
        token,
        sheetRef,
        currentAmount,
        user,
        setupStoredCreds,
        setLoginDetails,
        setCurrentAmount,
        logout,
      }}
    >
      {children}
    </AfroPayContext.Provider>
  );
}
