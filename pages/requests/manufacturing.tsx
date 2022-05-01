import { TableCell, Button, Typography, LinearProgress } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import usePolling from '../../util/client/usePolling';
import { DeliveryRequest } from '../../util/requests/types';
import { useSession } from 'next-auth/react';
import AcceptedAndOpenTables from '../../components/AcceptedAndAllOrdersTables';
import Loading from '../../components/Loading';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return {
    props: { session },
  };
}

export default function Manufacturing() {
  const { rows } = usePolling<DeliveryRequest>(
    '/api/requests/manufacturing/get'
  );

  return (
    <Layout>
      {!rows.length ? (
        <Loading />
      ) : (
        <AcceptedAndOpenTables
          rows={rows}
          AcceptedOrdersRow={AcceptedRow}
          OpenOrdersRow={OpenRow}
        />
      )}
    </Layout>
  );
}

function AcceptedRow({ row, head }: { row: DeliveryRequest; head?: boolean }) {
  const session = useSession();
  return (
    <>
      <TableCell>{row.item}</TableCell>
      <TableCell align="center">{row.quantity || '#'}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.deliveryLocation}</TableCell>
      <TableCell>{row.priority}</TableCell>
      <TableCell align="center">
        {head ? (
          'Accepted'
        ) : (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() =>
              fetch(`/api/requests/manufacturing/reject/${row.id}`)
            }
          >
            Drop
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
              onClick={() =>
                fetch(`/api/requests/manufacturing/complete/${row.id}`)
              }
            >
              Complete
            </Button>
          )) || <CancelIcon color="action" />}
      </TableCell>
    </>
  );
}
function OpenRow({ row, head }: { row: DeliveryRequest; head?: boolean }) {
  const session = useSession();
  return (
    <>
      <TableCell>{row.item}</TableCell>
      <TableCell align="center">{row.quantity || '#'}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.deliveryLocation}</TableCell>
      <TableCell>{row.priority}</TableCell>
      <TableCell align="center">
        {row.acceptedBy || (
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              fetch(`/api/requests/manufacturing/accept/${row.id}`)
            }
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
              onClick={() =>
                fetch(`/api/requests/manufacturing/complete/${row.id}`)
              }
            >
              Complete
            </Button>
          )) || <CancelIcon color="action" />}
      </TableCell>
    </>
  );
}
