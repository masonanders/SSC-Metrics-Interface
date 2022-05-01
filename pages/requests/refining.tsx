import { TableCell, TableRow } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { RefiningRequest, RequestType } from '../../util/requests/types';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
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

export default function Refining() {
  const rows = usePollRequests<RefiningRequest>(RequestType.REFINING);

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
      <TableCell align="center">{head ? '#' : row.quantity}</TableCell>
      <TableCell>{head ? 'Category' : row.category}</TableCell>
      <TableCell>{head ? 'Refinery zone' : row.refineryZone}</TableCell>
      <TableCell align="center">
        <AcceptedByCell
          requestType={RequestType.REFINING}
          request={row}
          head={head}
        />
      </TableCell>
      <TableCell align="center">
        <CompletedCell
          requestType={RequestType.REFINING}
          request={row}
          head={head}
        />
      </TableCell>
    </TableRow>
  );
}
