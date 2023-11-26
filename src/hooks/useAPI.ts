import { createContext, useContext, Context } from "react";
import { API } from "~/api";

export const APIContext: Context<API> = createContext(new API());

export function useAPI(): API {
  return useContext(APIContext);
}
