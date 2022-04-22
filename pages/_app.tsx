import { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import '../styles/globals.css';

function Application({ Component, pageProps: { session, ...pageProps } }) {
  if ((session as Session)?.forceSignout) {
    signOut();
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default Application;
