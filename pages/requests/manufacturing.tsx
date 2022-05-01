import { TableCell, TableRow } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
import usePolling from '../../util/client/usePolling';
import { ManufacturingRequest, RequestType } from '../../util/requests/types';
import AcceptedAndOpenTables from '../../components/AcceptedAndAllOrdersTables';
import AcceptedByCell from '../../components/AcceptedByCell';
import CompletedCell from '../../components/CompletedCell';
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
  const { rows } = usePolling<ManufacturingRequest>(
    '/api/requests/manufacturing/get'
  );

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
  row: ManufacturingRequest;
  head?: boolean;
}) {
  return (
    <TableRow>
      <TableCell>{head ? 'Item name' : row.item}</TableCell>
      <TableCell align="center">{head ? '#' : row.quantity}</TableCell>
      <TableCell>{head ? 'Category' : row.category}</TableCell>
      <TableCell>{head ? 'Refinery zone' : row.deliveryLocation}</TableCell>
      <TableCell>{head ? 'Priority' : row.priority}</TableCell>
      <TableCell align="center">
        <AcceptedByCell
          requestType={RequestType.MANUFACTURING}
          request={row}
          head={head}
        />
      </TableCell>
      <TableCell align="center">
        <CompletedCell
          requestType={RequestType.MANUFACTURING}
          request={row}
          head={head}
        />
      </TableCell>
    </TableRow>
  );
}
