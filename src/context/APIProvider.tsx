import React, { type FC, useEffect, useState } from "react";
import { ApiContext } from "../hooks/useAPI";
import API from "~/api/api";
import MockApi from "~/api/mockApi";
import ApiInterface from "~/api/apiInterface";
import { useLocalAuth } from "~/hooks/useLocalAuth";

interface Props {
  children: React.ReactNode;
}

export const APIProvider: FC<Props> = ({ children }) => {
  const [api, setAPI] = useState<ApiInterface>(new MockApi());
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { userToken } = useLocalAuth();

  useEffect(() => {
    if (userToken) {
      setAPI(new API(userToken));
      setAuthenticated(true);
    }
  }, [userToken]);

  return <ApiContext.Provider value={{api, authenticated}}>{children}</ApiContext.Provider>;
};
