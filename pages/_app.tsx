import { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import '../styles/globals.css';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

function Application({ Component, pageProps: { session, ...pageProps } }) {
  if ((session as Session)?.forceSignout) {
    signOut();
  }

  return (
    <SafeHydrate>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </SafeHydrate>
  );
}

export default Application;
