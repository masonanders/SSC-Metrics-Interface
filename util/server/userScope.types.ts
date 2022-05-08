export type FWGMemberRoleId = string;

export type UserScope = ReadonlySet<FWGMemberRoleId>;

export enum UserScopeLabel {
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  LOGIN = 'LOGIN',
}
