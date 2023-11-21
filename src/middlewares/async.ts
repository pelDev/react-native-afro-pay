import { useAfroPayContext } from '../hooks/useAfroPayContext';

export const useAsyncHandler = <T extends (...args: any) => any>(func: T) => {
  const { logout } = useAfroPayContext();

  return async (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T> | void>> => {
    try {
      return await func(args);
    } catch (error: any) {
      console.log(error, error?.response.data);
      if (error?.response?.status === 401) {
        logout();
      }
    }
  };
};
