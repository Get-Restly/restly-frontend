import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { LocalAuthProvider } from "~/context/LocalAuthProvider";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LocalAuthProvider>
        <Component {...pageProps} />
      </LocalAuthProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
