import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  Typography,
  TableCell,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { Request } from '../util/requests/types';

export default function Table<R extends Request>({
  rows,
  RowConstructor,
}: {
  rows: R[];
  RowConstructor: FunctionComponent<{ row: R; head?: boolean }>;
}) {
  return (
    <TableContainer
      sx={{ position: 'relative', height: '100%', overflow: 'auto' }}
    >
      <MuiTable>
        <TableHead
          sx={{ bgcolor: 'white', position: 'sticky', top: 0, zIndex: 1 }}
        >
          <RowConstructor row={rows[0]} head />
        </TableHead>
        <TableBody sx={{ zIndex: 0 }}>
          {rows.length > 1 ? (
            rows.slice(1).map((row) => <RowConstructor row={row} />)
          ) : (
            <TableCell colSpan={8}>
              <Typography sx={{ my: 4 }} textAlign="center" variant="h4">
                No requests
              </Typography>
            </TableCell>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
