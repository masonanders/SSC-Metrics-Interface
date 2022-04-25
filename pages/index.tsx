import { Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../components/Layout';
import {
  ADMIN_SCOPE,
  DIRECTOR_SCOPE,
  LOGIN_SCOPE,
  PRIVATE_SCOPE,
  PUBLIC_SCOPE,
} from '../util/constants';
import { validateSession } from '../util/validateSession';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const scopes = {
    DIRECTOR_SCOPE: [...DIRECTOR_SCOPE],
    ADMIN_SCOPE: [...ADMIN_SCOPE],
    PRIVATE_SCOPE: [...PRIVATE_SCOPE],
    PUBLIC_SCOPE: [...PUBLIC_SCOPE],
    LOGIN_SCOPE: [...LOGIN_SCOPE],
  };
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return { props: { session, scopes } };
}

export default function Home({ scopes }) {
  console.log('SCOPES', scopes);

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
