import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@mui/material';
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
      {rows.length ? (
        <TableContainer sx={{ mt: 8 }}>
          <Table>
            <TableHead>
              <Row head row={rows[0]} />
            </TableHead>
            <TableBody>
              {rows.slice(1).length ? (
                rows.slice(1).map((row) => (
                  <TableRow key={row.id}>
                    <Row row={row} />
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={7}>
                  <Typography textAlign="center" sx={{ py: 4 }} variant="h4">
                    No requests
                  </Typography>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ mt: 16 }} textAlign="center" variant="h4">
          Loading
        </Typography>
      )}
    </Layout>
  );
}

function Row({ row, head }: { row: DeliveryRequest; head?: boolean }) {
  const session = useSession();
  return (
    <>
      <TableCell>{head ? 'Item Name' : row.item}</TableCell>
      <TableCell align="center">{row.quantity || '#'}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.deliveryLocation}</TableCell>
      <TableCell>{row.priority}</TableCell>
      <TableCell align="center">
        {row.acceptedBy || (
          <Button
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
          (row.completed && <CheckCircleOutlineIcon />) ||
          (row.acceptedBy === session.data.member.nick && (
            <Button
              onClick={() =>
                fetch(`/api/requests/manufacturing/complete/${row.id}`)
              }
            >
              Complete
            </Button>
          )) || <CancelIcon />}
      </TableCell>
    </>
  );
}
