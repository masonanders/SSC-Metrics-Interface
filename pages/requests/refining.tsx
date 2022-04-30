import { Button, TableCell } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import usePolling from '../../util/client/usePolling';
import { RefiningRequest } from '../../util/requests/types';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '../../components/Table';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return { props: { session } };
}

export default function Refining() {
  const { rows } = usePolling<RefiningRequest>('/api/requests/refining/get');

  return (
    <Layout>
      <Table rows={rows} RowComponent={Row} />
    </Layout>
  );
}

function Row({ row, head }: { row: RefiningRequest; head?: boolean }) {
  const session = useSession();
  return (
    <>
      <TableCell>{row.item}</TableCell>
      <TableCell align="center">{row.quantity || '#'}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.refineryZone}</TableCell>
      <TableCell align="center">
        {row.acceptedBy || (
          <Button
            color="primary"
            variant="contained"
            onClick={() => fetch(`/api/requests/refining/accept/${row.id}`)}
          >
            Accept
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        {(head && 'Completed') ||
          (row.completed && <CheckCircleOutlineIcon color="success" />) ||
          (row.acceptedBy === session.data.member.nick && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => fetch(`/api/requests/refining/complete/${row.id}`)}
            >
              Complete
            </Button>
          )) || <CancelIcon color="action" />}
      </TableCell>
    </>
  );
}
