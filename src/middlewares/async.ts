import { useAfroPayContext } from '../hooks/useAfroPayContext';

export const useAsyncHandler = <T extends (...args: any) => any>(func: T) => {
  const { logout } = useAfroPayContext();

  return async (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T> | void>> => {
    try {
      return await func(args);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        logout();
      }
    }
  };
};
