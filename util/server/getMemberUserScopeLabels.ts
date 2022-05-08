import isMemberWithinScope from './isMemberWithinScope';
import {
  ADMIN_SCOPE,
  DIRECTOR_SCOPE,
  LOGIN_SCOPE,
  PRIVATE_SCOPE,
  PUBLIC_SCOPE,
} from './userScope';

export default function getMemberUserScopeLabels(
  member: DiscordMember
): UserScopeLabel[] {
  const userScopeLabels = [];
  if (isMemberWithinScope(member, DIRECTOR_SCOPE))
    userScopeLabels.push(UserScopeLabel.DIRECTOR);
  if (isMemberWithinScope(member, ADMIN_SCOPE))
    userScopeLabels.push(UserScopeLabel.ADMIN);
  if (isMemberWithinScope(member, PRIVATE_SCOPE))
    userScopeLabels.push(UserScopeLabel.PRIVATE);
  if (isMemberWithinScope(member, PUBLIC_SCOPE))
    userScopeLabels.push(UserScopeLabel.PUBLIC);
  if (isMemberWithinScope(member, LOGIN_SCOPE))
    userScopeLabels.push(UserScopeLabel.LOGIN);
  return userScopeLabels;
}
