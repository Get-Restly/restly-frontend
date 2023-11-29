import React, { type FC, useEffect, useState } from "react";
import { Mutex } from "async-mutex";
import { LocalAuthContext } from "../hooks/useLocalAuth";
import AuthApi from "~/api/authApi";

const RESTLY_TOKEN = "restlyToken";

interface Props {
  children: React.ReactNode;
}

export const LocalAuthProvider: FC<Props> = ({ children }) => {
  const [mutex] = useState(() => new Mutex());
  const [userToken, setUserToken] = useState<string | null>(null);
  
  const initUserToken = async () => {
    const token = localStorage.getItem(RESTLY_TOKEN);
    if (token) {
      return token;
    }
    const newToken = await AuthApi.createUser();
    if (!newToken) {
      throw new Error("Invalid token!");
    }
    localStorage.setItem(RESTLY_TOKEN, newToken);
    return newToken;
  }
  
  useEffect(() => {
    if (!mutex) {
      return;
    }
    mutex.runExclusive(
      async () => {
        const token = await initUserToken();
        setUserToken(token);
      }
    ).catch((e) => console.error(e));
  }, [mutex]);
    
  return (
    <LocalAuthContext.Provider value={{ userToken }}>
      {children}
    </LocalAuthContext.Provider>
  );
};
