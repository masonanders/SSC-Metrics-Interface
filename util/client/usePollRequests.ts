import { useContext, useEffect } from 'react';
import { Request, RequestType } from '../requests/types';
import { RequestUpdateBufferContext } from './requestUpdateBuffer';
import usePolling from './usePolling';

export default function usePollRequests<R extends Request>(
  requestType: RequestType
): R[] {
  const { isRequestUpdated, stopUpdatingRequests } = useContext(
    RequestUpdateBufferContext
  );
  const { rows } = usePolling<R>(`/api/requests/${requestType}/get`);

  useEffect(() => {
    const updatedRows = rows.filter(isRequestUpdated);
    if (updatedRows.length) stopUpdatingRequests<R>(updatedRows);
  }, [rows]);

  return rows;
}
