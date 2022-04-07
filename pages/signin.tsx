import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSession, signIn } from 'next-auth/react';

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Login!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Please, login!" />
        <p className="description">Get started by logging in</p>
        <button onClick={() => signIn('discord')}>Log in</button>
      </main>

      <Footer />
    </div>
  );
}
