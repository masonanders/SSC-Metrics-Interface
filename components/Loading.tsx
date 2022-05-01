import { LinearProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <>
      <Typography sx={{ mt: 24, mb: 12 }} textAlign="center" variant="h4">
        Loading
      </Typography>
      <LinearProgress />
    </>
  );
}
