import { ThemeProvider } from '@mui/material';
import { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { RequestUpdateBufferContextProvider } from '../util/client/requestUpdateBuffer';
import { lightTheme } from '../util/client/theme';

function Application({ Component, pageProps: { session, ...pageProps } }) {
  if (typeof window === 'undefined') return null;
  const { query, replace, pathname } = useRouter();
  if (Object.keys(query).length) {
    replace(pathname, undefined, { shallow: true });
  }

  if ((session as Session)?.forceSignout) {
    signOut();
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={lightTheme}>
        <RequestUpdateBufferContextProvider>
          <Component {...pageProps} />
        </RequestUpdateBufferContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Application;
