import { Button } from '@mui/material';
import { Request, RequestType } from '../util/requests/types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';

export default function CompletedCell<R extends Request>({
  requestType,
  request,
  head,
}: {
  requestType: RequestType;
  request: R;
  head?: boolean;
}): ReactElement {
  const session = useSession();

  return head ? (
    <>Completed</>
  ) : request.completed ? (
    <CheckCircleOutlineIcon color="success" />
  ) : request.acceptedBy === session.data.member.nick ? (
    <Button
      color="primary"
      variant="contained"
      onClick={() =>
        fetch(`/api/requests/${requestType}/complete/${request.id}`)
      }
    >
      Complete
    </Button>
  ) : (
    <CancelIcon color="action" />
  );
}
