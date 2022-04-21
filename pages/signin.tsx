import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Login!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className="description">Get started by logging in</p>
        <button onClick={() => signIn('discord')}>Log in</button>
      </main>
    </div>
  );
}
