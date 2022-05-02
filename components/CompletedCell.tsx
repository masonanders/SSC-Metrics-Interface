import { Button } from '@mui/material';
import { Request, RequestType } from '../util/requests/types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSession } from 'next-auth/react';
import { ReactElement, useContext } from 'react';
import { RequestUpdateBufferContext } from '../util/client/requestUpdateBuffer';

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
  const { isRequestUpdating, startUpdatingRequests, stopUpdatingRequests } =
    useContext(RequestUpdateBufferContext);

  return head ? (
    <>Completed</>
  ) : request.completed ? (
    <CheckCircleOutlineIcon color="success" />
  ) : request.acceptedBy === session.data.member.nick ? (
    <Button
      size="small"
      disabled={isRequestUpdating(request)}
      color="primary"
      variant="contained"
      onClick={() => {
        try {
          startUpdatingRequests([request]);
          fetch(`/api/requests/${requestType}/complete/${request.id}`);
        } catch {
          stopUpdatingRequests([request]);
        }
      }}
    >
      Complete
    </Button>
  ) : (
    <CancelIcon color="action" />
  );
}
