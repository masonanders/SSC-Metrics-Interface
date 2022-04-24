import { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function Application({ Component, pageProps: { session, ...pageProps } }) {
  if (typeof window === 'undefined') return null;
  const { query, replace, pathname } = useRouter();
  console.log(query);
  if (Object.keys(query).length) {
    console.log(pathname);
    replace(pathname, undefined, { shallow: true });
  }

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
