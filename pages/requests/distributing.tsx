import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { DeliveryRequest } from '../../util/requests/types';
import { validateSession } from '../../util/validateSession';
import { authOptions } from './../api/auth/[...nextauth]';
import usePolling from '../../util/client/usePolling';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return { props: { session } };
}

export default function Distributing() {
  const { rows } = usePolling<DeliveryRequest>(
    '/api/requests/distributing/get'
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
                <TableCell colSpan={8}>
                  <Typography sx={{ my: 4 }} textAlign="center" variant="h4">
                    No requests
                  </Typography>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Typography sx={{ mt: 24, mb: 12 }} textAlign="center" variant="h4">
            Loading
          </Typography>
          <LinearProgress />
        </>
      )}
    </Layout>
  );
}

function Row({ row, head }: { row: DeliveryRequest; head?: boolean }) {
  const session = useSession();
  return (
    <>
      <TableCell>{row.item}</TableCell>
      <TableCell align="center">{row.quantity || '#'}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.pickupLocation}</TableCell>
      <TableCell>{row.deliveryLocation}</TableCell>
      <TableCell>{row.priority}</TableCell>
      <TableCell align="center">
        {row.acceptedBy || (
          <Button
            color="primary"
            variant="contained"
            onClick={() => fetch(`/api/requests/distributing/accept/${row.id}`)}
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
              color="primary"
              variant="contained"
              onClick={() =>
                fetch(`/api/requests/distributing/complete/${row.id}`)
              }
            >
              Complete
            </Button>
          )) || <CancelIcon />}
      </TableCell>
    </>
  );
}
