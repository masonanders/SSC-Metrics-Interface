import { Session } from 'next-auth';

type ValidationResults = {
  redirect?: {
    destination: string;
    permanent: boolean;
  };
};

export function validateSession(session: Session): ValidationResults {
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {};
}
