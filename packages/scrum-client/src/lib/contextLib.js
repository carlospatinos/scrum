import { useContext, createContext } from 'react';
// TODO REMOVE ENTIRE FILE
export const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}
