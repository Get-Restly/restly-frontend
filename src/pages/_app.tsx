import { type Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { APIProvider } from "~/context/APIProvider";
import { LocalAuthProvider } from "~/context/LocalAuthProvider";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const RestlyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // <SessionProvider session={session}>
    <LocalAuthProvider>
      <APIProvider>
        <Component {...pageProps} />
      </APIProvider>
    </LocalAuthProvider>
    // </SessionProvider>
  );
};

export default api.withTRPC(RestlyApp);
