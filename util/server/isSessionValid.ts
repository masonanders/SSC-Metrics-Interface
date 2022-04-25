import { Session } from 'next-auth';
import { LOGIN_SCOPE } from '../constants';
import isMemberWithinScope from './isMemberWithinScope';

export default function isSessionValid(session: Session): boolean {
  return (
    session &&
    session.member &&
    !session.forceSignout &&
    isMemberWithinScope(session.member, LOGIN_SCOPE)
  );
}
