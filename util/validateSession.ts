import { Session } from 'next-auth';

type ValidationResults = {
  redirect?: {
    destination: string,
    permanent: boolean,
  }
}


export function validateSession(session: Session): ValidationResults {
  if (!session || session.forceSignout || session.error) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {}
}
