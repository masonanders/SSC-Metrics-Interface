import { UserScope } from '../userScope';

export default function isMemberWithinScope(
  member: DiscordMember,
  scope: UserScope
): boolean {
  const { roles: memberRoles } = member;
  return memberRoles.some((role) => scope.has(role));
}
