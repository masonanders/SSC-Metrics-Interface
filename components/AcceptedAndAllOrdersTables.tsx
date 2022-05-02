import { Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/react';
import { FunctionComponent, useMemo, useState } from 'react';
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
  const [showOpenAcceptedOrders, toggleShowOpenAcceptedOrders] =
    useState<boolean>(false);
  const [showOpenCompletedOrders, toggleShowOpenCompletedOrders] =
    useState<boolean>(false);
  const { acceptedRows, openRows } = useMemo(
    () =>
      rows.slice(1).reduce<{
        acceptedRows: { incomplete: R[]; complete: R[] };
        openRows: { open: R[]; accepted: R[]; complete: R[] };
      }>(
        (acc, row) => {
          if (session.data.member.nick === row.acceptedBy) {
            acc.acceptedRows[row.completed ? 'complete' : 'incomplete'].push(
              row
            );
          } else {
            acc.openRows[
              row.completed ? 'complete' : row.acceptedBy ? 'accepted' : 'open'
            ].push(row);
          }

          return acc;
        },
        {
          acceptedRows: { incomplete: [], complete: [] },
          openRows: { open: [], accepted: [], complete: [] },
        }
      ),
    [session, rows]
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
          <Box display="flex" alignItems="center">
            <Checkbox
              disabled={!acceptedRows.complete.length}
              onClick={() =>
                toggleShowAcceptedCompletedOrders(!showAcceptedCompletedOrders)
              }
              checked={showAcceptedCompletedOrders}
              size="small"
            />
            <Typography
              variant="body2"
              color={(theme) =>
                theme.palette.text[
                  acceptedRows.complete.length ? 'primary' : 'disabled'
                ]
              }
            >
              Show completed
            </Typography>
          </Box>
        </Box>
        <Table
          rows={[
            rowHead,
            ...acceptedRows.incomplete,
            ...(showAcceptedCompletedOrders ? acceptedRows.complete : []),
          ]}
          RowConstructor={RowConstructor}
        />
      </Box>
      <Box display="flex" flexDirection="column" overflow="hidden">
        <Box
          display="grid"
          gridTemplateColumns="[title-start] auto [title-end] auto [accepted-checkbox-start] min-content [accepted-checkbox-end] 24px [completed-checkbox-start] min-content [completed-checkbox-end]"
        >
          <Typography fontWeight="bold" variant="h6" gridColumn="title">
            Open orders
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gridColumn="accepted-checkbox"
          >
            <Checkbox
              disabled={!openRows.accepted.length}
              onClick={() =>
                toggleShowOpenAcceptedOrders(!showOpenAcceptedOrders)
              }
              checked={showOpenAcceptedOrders}
              size="small"
            />
            <Typography
              whiteSpace="nowrap"
              variant="body2"
              color={(theme) =>
                theme.palette.text[
                  openRows.accepted.length ? 'primary' : 'disabled'
                ]
              }
            >
              Show accepted
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gridColumn="completed-checkbox"
          >
            <Checkbox
              disabled={!openRows.complete.length}
              onClick={() =>
                toggleShowOpenCompletedOrders(!showOpenCompletedOrders)
              }
              checked={showOpenCompletedOrders}
              size="small"
            />
            <Typography
              whiteSpace="nowrap"
              variant="body2"
              color={(theme) =>
                theme.palette.text[
                  openRows.complete.length ? 'primary' : 'disabled'
                ]
              }
            >
              Show completed
            </Typography>
          </Box>
        </Box>
        <Table
          rows={[
            rowHead,
            ...openRows.open,
            ...(showOpenAcceptedOrders ? openRows.accepted : []),
            ...(showOpenCompletedOrders ? openRows.complete : []),
          ]}
          RowConstructor={RowConstructor}
        />
      </Box>
    </Box>
  );
}
