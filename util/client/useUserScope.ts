import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { UserScopeLabel } from '../server/userScope.types';

export default function useUserScope() {
  const session = useSession();

  const hasUserScopeAccess = useCallback(
    (userScopeLabel: UserScopeLabel) => {
      return session.data.scope.includes(userScopeLabel);
    },
    [session]
  );

  return { hasUserScopeAccess };
}
