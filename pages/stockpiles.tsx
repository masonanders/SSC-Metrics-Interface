import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../components/Layout';
import { validateSession } from '../util/validateSession';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return { props: { session } };
}

export default function Stockpiles() {
  return <Layout>Main content</Layout>;
}
