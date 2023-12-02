import { createContext, useContext } from "react";
import type ApiInterface from "~/api/apiInterface";

export interface ApiState {
  api: ApiInterface;
  authenticated: boolean;
}

export const ApiContext = createContext<ApiState>({} as ApiState);

export function useApi(): ApiState {
  return useContext(ApiContext);
}
