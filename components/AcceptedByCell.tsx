import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ReactElement, useContext } from 'react';
import { RequestUpdateBufferContext } from '../util/client/requestUpdateBuffer';
import { Request, RequestType } from '../util/requests/types';

export default function AcceptedByCell<R extends Request>({
  requestType,
  request,
  head,
}: {
  requestType: RequestType;
  request: R;
  head?: boolean;
}): ReactElement {
  const session = useSession();
  const isAcceptedByCurrentUser =
    request.acceptedBy === session.data.member.user.username;
  const { isRequestUpdating, startUpdatingRequests, stopUpdatingRequests } =
    useContext(RequestUpdateBufferContext);

  return head ? (
    <>Accepted by</>
  ) : isAcceptedByCurrentUser && !request.completed ? (
    <Button
      disabled={isRequestUpdating(request)}
      onClick={async () => {
        try {
          startUpdatingRequests([request]);
          fetch(`/api/requests/${requestType}/reject/${request.id}`);
        } catch {
          stopUpdatingRequests([request]);
        }
      }}
      size="small"
      color="secondary"
      variant="outlined"
    >
      Drop
    </Button>
  ) : request.acceptedBy ? (
    <>{request.acceptedBy}</>
  ) : (
    <Button
      disabled={isRequestUpdating(request)}
      size="small"
      color="primary"
      variant="contained"
      onClick={() => {
        try {
          startUpdatingRequests([request]);
          fetch(`/api/requests/${requestType}/accept/${request.id}`);
        } catch {
          stopUpdatingRequests([request]);
        }
      }}
    >
      Accept
    </Button>
  );
}
