import { Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/react';
import { FunctionComponent, useState } from 'react';
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
  const [showAcceptedCompletedOrders, toggleShowAcceptedCompletedOrders] =
    useState<boolean>(false);
  const [showOpenCompletedOrders, toggleShowOpenCompletedOrders] =
    useState<boolean>(false);
  const { acceptedRows, openRows } = rows.slice(1).reduce<{
    acceptedRows: R[];
    openRows: R[];
  }>(
    (acc, row) => {
      if (session.data.member.nick === row.acceptedBy) {
        if (!row.completed || showAcceptedCompletedOrders) {
          acc.acceptedRows.push(row);
        }
      } else if (!row.completed || showOpenCompletedOrders) {
        acc.openRows.push(row);
      }

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
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold" variant="h6">
            Accepted by you
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              '&:hover': {
                cursor: 'pointer`',
              },
            }}
          >
            <Checkbox
              onClick={() =>
                toggleShowAcceptedCompletedOrders(!showAcceptedCompletedOrders)
              }
              checked={showAcceptedCompletedOrders}
              size="small"
            />
            <Typography variant="body2">Show completed</Typography>
          </Box>
        </Box>
        <Table
          rows={[rowHead, ...acceptedRows]}
          RowConstructor={RowConstructor}
        />
      </Box>
      <Box display="flex" flexDirection="column" overflow="hidden">
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold" variant="h6">
            Open orders
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              '&:hover': {
                cursor: 'pointer`',
              },
            }}
          >
            <Checkbox
              onClick={() =>
                toggleShowOpenCompletedOrders(!showOpenCompletedOrders)
              }
              checked={showOpenCompletedOrders}
              size="small"
            />
            <Typography variant="body2">Show completed</Typography>
          </Box>
        </Box>
        <Table rows={[rowHead, ...openRows]} RowConstructor={RowConstructor} />
      </Box>
    </Box>
  );
}
