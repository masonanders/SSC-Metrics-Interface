import Head from 'next/head';

export default function Forbidden() {
  return (
    <div className="container">
      <Head>
        <title>Forbidden</title>
      </Head>
      <main>Inauthorized</main>
    </div>
  );
}
