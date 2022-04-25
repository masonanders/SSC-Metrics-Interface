import { Typography } from '@mui/material';
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

export default function Home() {
  return (
    <Layout>
      <Typography sx={{ mt: 8 }} textAlign="center" variant="h1">
        SSC Metrics
      </Typography>
      <Typography sx={{ mt: 16 }} textAlign="center" variant="h2">
        Coming soon!
      </Typography>
      <Typography sx={{ mt: 8 }} textAlign="center" variant="h5">
        (check out Manufacturing and Distributing in the meantime)
      </Typography>
    </Layout>
  );
}
