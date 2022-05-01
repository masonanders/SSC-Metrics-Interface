import { createContext, ReactNode, useCallback, useState } from 'react';
import { Request } from '../requests/types';

export const RequestUpdateBufferContext = createContext<{
  isRequestUpdating: <R extends Request>(request: R) => boolean;
  isRequestUpdated: <R extends Request>(request: R) => boolean;
  startUpdatingRequests: <R extends Request>(requests: R[]) => void;
  stopUpdatingRequests: <R extends Request>(requests: R[]) => void;
}>({
  isRequestUpdating: () => false,
  isRequestUpdated: () => false,
  startUpdatingRequests: () => undefined,
  stopUpdatingRequests: () => undefined,
});

export function RequestUpdateBufferContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [store, setStore] = useState<Record<string, string>>({});

  const isRequestUpdating = useCallback(
    <R extends Request>(request: R) => {
      return Object.prototype.hasOwnProperty.call(store, request.id);
    },
    [store]
  );

  const isRequestUpdated = useCallback(
    <R extends Request>(request: R) => {
      return (
        isRequestUpdating(request) &&
        store[request.id] !== encodeRequest(request)
      );
    },
    [isRequestUpdating, store]
  );

  const startUpdatingRequests = useCallback(
    <R extends Request>(requests: R[]) => {
      const newStore = { ...store };
      requests.forEach((request) => {
        newStore[request.id] = encodeRequest(request);
      });
      setStore(newStore);
    },
    [store, setStore]
  );

  const stopUpdatingRequests = useCallback(
    <R extends Request>(requests: R[]) => {
      const newStore = { ...store };
      let update = false;
      requests.forEach((request) => {
        if (isRequestUpdating(request)) {
          delete newStore[request.id];
          update = true;
        }
      });
      update && setStore(newStore);
    },
    [isRequestUpdating, store, setStore]
  );

  return (
    <RequestUpdateBufferContext.Provider
      value={{
        isRequestUpdating,
        isRequestUpdated,
        startUpdatingRequests,
        stopUpdatingRequests,
      }}
    >
      {children}
    </RequestUpdateBufferContext.Provider>
  );
}

function encodeRequest<R extends Request>(request: R): string {
  return btoa(JSON.stringify(request));
}
