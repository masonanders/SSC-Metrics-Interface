import { TableCell, TableRow } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { validateSession } from '../../util/validateSession';
import { authOptions } from '../api/auth/[...nextauth]';
import { ManufacturingRequest, RequestType } from '../../util/requests/types';
import AcceptedAndOpenTables from '../../components/AcceptedAndAllOrdersTables';
import AcceptedByCell from '../../components/AcceptedByCell';
import CompletedCell from '../../components/CompletedCell';
import Loading from '../../components/Loading';
import usePollRequests from '../../util/client/usePollRequests';
import {
  LocationTableCell,
  PriorityTableCell,
  QuantityAndCostTableCell,
} from '../../components/customTableCells';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context, authOptions);
  const { redirect } = validateSession(session);
  if (redirect) return { redirect };

  return {
    props: { session },
  };
}

export default function Manufacturing() {
  const rows = usePollRequests<ManufacturingRequest>(RequestType.MANUFACTURING);

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
      <QuantityAndCostTableCell head={head} row={row} />
      <TableCell>{head ? 'Category' : row.category}</TableCell>
      <LocationTableCell
        head={head}
        title="Delivery location"
        location={row.deliveryLocation}
        region={row.deliveryRegion}
        zone={row.deliveryZone}
      />
      <PriorityTableCell head={head} row={row} />
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
