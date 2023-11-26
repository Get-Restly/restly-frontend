import React, { type FC, useEffect, useState } from "react";
import { APIContext } from "../hooks/useAPI";
import { API } from "~/api";

interface Props {
  children: React.ReactNode;
}

export const APIProvider: FC<Props> = ({ children }) => {
  const api = new API();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      api.setUserToken(token);
      return;
    }
    API.createUser()
      .then((token) => {
        if (!token) {
          throw new Error("Invalid token!");
        }
        localStorage.setItem("userToken", token);
        api.setUserToken(token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};
