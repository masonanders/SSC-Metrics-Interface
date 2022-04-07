import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSession, signOut } from 'next-auth/react';

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </main>

      <Footer />
    </div>
  );
}
