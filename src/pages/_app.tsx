import { type Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { APIProvider } from "~/context/APIProvider";
import { LocalAuthProvider } from "~/context/LocalAuthProvider";
import { api } from "~/utils/api";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "~/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { env } from "~/env.mjs";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

const RestlyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    // <SessionProvider session={session}>
    <PostHogProvider client={posthog}>
      <LocalAuthProvider>
        <APIProvider>
          <Component {...pageProps} />
        </APIProvider>
      </LocalAuthProvider>
    </PostHogProvider>
    // </SessionProvider>
  );
};

export default api.withTRPC(RestlyApp);
