import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
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
    request.acceptedBy === session.data.member.nick;

  return head ? (
    <>Accepted by</>
  ) : isAcceptedByCurrentUser ? (
    <Button
      onClick={() => fetch(`/api/requests/${requestType}/reject/${request.id}`)}
      color="secondary"
      variant="outlined"
    >
      Drop
    </Button>
  ) : request.acceptedBy ? (
    <>{request.acceptedBy}</>
  ) : (
    <Button
      color="primary"
      variant="contained"
      onClick={() => fetch(`/api/requests/${requestType}/accept/${request.id}`)}
    >
      Accept
    </Button>
  );
}
