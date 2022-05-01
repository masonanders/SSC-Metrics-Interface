import { TableCell, TableRow } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { DeliveryRequest, RequestType } from '../../util/requests/types';
import { validateSession } from '../../util/validateSession';
import { authOptions } from './../api/auth/[...nextauth]';
import AcceptedAndOpenTables from '../../components/AcceptedAndAllOrdersTables';
import AcceptedByCell from '../../components/AcceptedByCell';
import CompletedCell from '../../components/CompletedCell';
import Loading from '../../components/Loading';
import usePollRequests from '../../util/client/usePollRequests';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return { props: { session } };
}

export default function Distributing() {
  const rows = usePollRequests<DeliveryRequest>(RequestType.DISTRIBUTING);

  return (
    <Layout>
      {!rows.length ? (
        <Loading />
      ) : (
        <AcceptedAndOpenTables rows={rows} RowConstructor={RowConstructor} />
      )}
    </Layout>
  );
}

function RowConstructor({
  row,
  head,
}: {
  row: DeliveryRequest;
  head?: boolean;
}) {
  return (
    <TableRow>
      <TableCell>{head ? 'Item name' : row.item}</TableCell>
      <TableCell align="center">{head ? '#' : row.quantity}</TableCell>
      <TableCell>{head ? 'Category' : row.category}</TableCell>
      <TableCell>{head ? 'Pickup location' : row.pickupLocation}</TableCell>
      <TableCell>{head ? 'Delivery location' : row.deliveryLocation}</TableCell>
      <TableCell>{head ? 'Priority' : row.priority}</TableCell>
      <TableCell align="center">
        <AcceptedByCell
          requestType={RequestType.DISTRIBUTING}
          request={row}
          head={head}
        />
      </TableCell>
      <TableCell align="center">
        <CompletedCell
          requestType={RequestType.DISTRIBUTING}
          request={row}
          head={head}
        />
      </TableCell>
    </TableRow>
  );
}
