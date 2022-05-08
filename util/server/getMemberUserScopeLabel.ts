import isMemberWithinScope from './isMemberWithinScope';
import {
  ADMIN_SCOPE,
  DIRECTOR_SCOPE,
  LOGIN_SCOPE,
  PRIVATE_SCOPE,
  PUBLIC_SCOPE,
  UserScopeLabel,
} from './userScope';

export default function getMemberUserScopeLabel(
  member: DiscordMember
): UserScopeLabel {
  switch (true) {
    case isMemberWithinScope(member, DIRECTOR_SCOPE):
      return UserScopeLabel.DIRECTOR;
    case isMemberWithinScope(member, ADMIN_SCOPE):
      return UserScopeLabel.ADMIN;
    case isMemberWithinScope(member, PRIVATE_SCOPE):
      return UserScopeLabel.PRIVATE;
    case isMemberWithinScope(member, PUBLIC_SCOPE):
      return UserScopeLabel.PUBLIC;
    case isMemberWithinScope(member, LOGIN_SCOPE):
      return UserScopeLabel.LOGIN;
  }
}
