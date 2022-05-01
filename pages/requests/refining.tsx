import { TableCell, TableRow } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import usePolling from '../../util/client/usePolling';
import { RefiningRequest, RequestType } from '../../util/requests/types';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
import AcceptedAndOpenTables from '../../components/AcceptedAndAllOrdersTables';
import AcceptedByCell from '../../components/AcceptedByCell';
import CompletedCell from '../../components/CompletedCell';
import Loading from '../../components/Loading';

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
      {!rows.length ? (
        <Loading />
      ) : (
        <AcceptedAndOpenTables rows={rows} RowConstructor={RowConstrctor} />
      )}
    </Layout>
  );
}

function RowConstrctor({
  row,
  head,
}: {
  row: RefiningRequest;
  head?: boolean;
}) {
  return (
    <TableRow>
      <TableCell>{head ? 'Item name' : row.item}</TableCell>
      <TableCell>{head ? '#' : row.quantity}</TableCell>
      <TableCell>{head ? 'Category' : row.category}</TableCell>
      <TableCell>{head ? 'Refinery zone' : row.refineryZone}</TableCell>
      <TableCell>
        <AcceptedByCell
          requestType={RequestType.REFINING}
          request={row}
          head={head}
        />
      </TableCell>
      <TableCell>
        <CompletedCell
          requestType={RequestType.REFINING}
          request={row}
          head={head}
        />
      </TableCell>
    </TableRow>
  );
}
