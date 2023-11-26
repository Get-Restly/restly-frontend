import { createContext, useContext } from "react";

export interface LocalAuthState {
  userToken: string | null;
}

export const LocalAuthContext = createContext<LocalAuthState>(
  {} as LocalAuthState,
);

export function useLocalAuth(): LocalAuthState {
  return useContext(LocalAuthContext);
}
