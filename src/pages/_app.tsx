import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { APIProvider } from "~/context/APIProvider";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <APIProvider>
        <Component {...pageProps} />
      </APIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
