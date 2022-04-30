import { FunctionComponent } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  LinearProgress,
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
  return rows.length ? (
    <TableContainer sx={{ mt: 8 }}>
      <MuiTable>
        <TableHead>
          <RowComponent head row={rows[0]} />
        </TableHead>
        <TableBody>
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
  ) : (
    <>
      <Typography sx={{ mt: 24, mb: 12 }} textAlign="center" variant="h4">
        Loading
      </Typography>
      <LinearProgress />
    </>
  );
}
