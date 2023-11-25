import React, { FC, useEffect, useState } from "react";
import { LocalAuthContext } from "../hooks/useLocalAuth";
import { createUser } from "~/api";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

export const LocalAuthProvider: FC<Props> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return;
    }
    createUser().then((token) => {
      if (!token) {
        throw new Error("Invalid token!");
      }
      localStorage.setItem("userToken", token);
      setUserToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <LocalAuthContext.Provider
      value={{ userToken }}
    >
      { children }
    </LocalAuthContext.Provider>
  );
};
