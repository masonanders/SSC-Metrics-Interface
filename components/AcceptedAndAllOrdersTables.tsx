import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import { Request } from '../util/requests/types';
import Table from './Table';

export default function AcceptedAndOpenTables<R extends Request>({
  rows,
  RowConstructor,
}: {
  rows: R[];
  RowConstructor: FunctionComponent<{ row: R; head?: boolean }>;
}) {
  const session = useSession();
  const rowHead = rows[0];
  const { acceptedRows, openRows } = rows.slice(1).reduce<{
    acceptedRows: R[];
    openRows: [];
  }>(
    (acc, row) => {
      (session.data.member.nick === row.acceptedBy
        ? acc.acceptedRows
        : acc.openRows
      ).push(row);
      return acc;
    },
    {
      acceptedRows: [],
      openRows: [],
    }
  );

  return (
    <Box
      height="calc(100vh - 64px)"
      display="grid"
      gridTemplateRows="fit-content(100%) fit-content(100%)"
      alignContent="space-evenly"
      py={4}
      rowGap={4}
    >
      <Box display="flex" flexDirection="column" overflow="hidden">
        <Typography fontWeight="bold" variant="h6">
          Accepted by you
        </Typography>
        <Table
          rows={[rowHead, ...acceptedRows]}
          RowConstructor={RowConstructor}
        />
      </Box>
      <Box display="flex" flexDirection="column" overflow="hidden">
        <Typography fontWeight="bold" variant="h6">
          Open orders
        </Typography>
        <Table rows={[rowHead, ...openRows]} RowConstructor={RowConstructor} />
      </Box>
    </Box>
  );
}
