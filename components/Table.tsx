import { FunctionComponent } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  TableCell,
} from '@mui/material';
import { Request } from '../util/requests/types';

export default function Table<R extends Request>({
  rows,
  RowComponent,
}: {
  rows: R[];
  RowComponent: FunctionComponent<{ row: R; head?: boolean }>;
}) {
  return (
    <TableContainer
      sx={{ position: 'relative', height: '100%', overflow: 'auto' }}
    >
      <MuiTable>
        <TableHead
          sx={{ bgcolor: 'white', position: 'sticky', top: 0, zIndex: 1 }}
        >
          <RowComponent head row={rows[0]} />
        </TableHead>
        <TableBody sx={{ zIndex: 0 }}>
          {rows.length > 1 ? (
            rows.slice(1).map((row) => (
              <TableRow key={row.id}>
                <RowComponent row={row} />
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
      </MuiTable>
    </TableContainer>
  );
}
