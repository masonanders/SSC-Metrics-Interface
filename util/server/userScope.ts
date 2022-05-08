// FWG Discord Server Member Roles
type FWGMemberRoleId = string;

export const FWGMemberRole = {
  ADJUTANT: process.env.FWG_ROLE_ID_ADJUTANT as FWGMemberRoleId,
  ADMEME: process.env.FWG_ROLE_ID_ADMEME as FWGMemberRoleId,
  ALLIED_COMMANDER: process.env.FWG_ROLE_ID_ALLIED_COMMANDER as FWGMemberRoleId,
  CAPTAIN: process.env.FWG_ROLE_ID_CAPTAIN as FWGMemberRoleId,
  COLONIAL: process.env.FWG_ROLE_ID_COLONIAL as FWGMemberRoleId,
  COMMANDANT: process.env.FWG_ROLE_ID_COMMANDANT as FWGMemberRoleId,
  COMMISSAR: process.env.FWG_ROLE_ID_COMMISSAR as FWGMemberRoleId,
  COMRADE: process.env.FWG_ROLE_ID_COMRADE as FWGMemberRoleId,
  ENGINEER: process.env.FWG_ROLE_ID_ENGINEER as FWGMemberRoleId,
  ENGINEER_CHIEF: process.env.FWG_ROLE_ID_ENGINEER_CHIEF as FWGMemberRoleId,
  GARRISON: process.env.FWG_ROLE_ID_GARRISON as FWGMemberRoleId,
  GUARDSMAN: process.env.FWG_ROLE_ID_GUARDSMAN as FWGMemberRoleId,
  LEAD: process.env.FWG_ROLE_ID_LEAD as FWGMemberRoleId,
  LOGISTICS: process.env.FWG_ROLE_ID_LOGISTICS as FWGMemberRoleId,
  LOGISTICS_DIRECTOR: process.env
    .FWG_ROLE_ID_LOGISTICS_DIRECTOR as FWGMemberRoleId,
  PIRATE: process.env.FWG_ROLE_ID_PIRATE as FWGMemberRoleId,
  PIRATE_CAPTAIN: process.env.FWG_ROLE_ID_PIRATE_CAPTAIN as FWGMemberRoleId,
  RECRUIT: process.env.FWG_ROLE_ID_RECRUIT as FWGMemberRoleId,
  RESERVE: process.env.FWG_ROLE_ID_RESERVE as FWGMemberRoleId,
  TEMPEST_COMMODORE: process.env
    .FWG_ROLE_ID_TEMPEST_COMMODORE as FWGMemberRoleId,
  TEMPEST_MARINE: process.env.FWG_ROLE_ID_TEMPEST_MARINE as FWGMemberRoleId,
  WARDEN: process.env.FWG_ROLE_ID_WARDEN as FWGMemberRoleId,
} as const;

// User Scope

export enum UserScopeLabel {
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  LOGIN = 'LOGIN',
}

export type UserScope = ReadonlySet<FWGMemberRoleId>;

export const DIRECTOR_SCOPE: UserScope = new Set([
  FWGMemberRole.ADJUTANT,
  FWGMemberRole.COMMANDANT,
  FWGMemberRole.LOGISTICS_DIRECTOR,
]);

export const ADMIN_SCOPE: UserScope = new Set([
  ...DIRECTOR_SCOPE,
  FWGMemberRole.CAPTAIN,
  FWGMemberRole.LEAD,
]);

export const PRIVATE_SCOPE: UserScope = new Set([
  ...ADMIN_SCOPE,
  FWGMemberRole.ADMEME,
  FWGMemberRole.GUARDSMAN,
  FWGMemberRole.LOGISTICS,
]);

export const PUBLIC_SCOPE: UserScope = new Set([
  ...PRIVATE_SCOPE,
  FWGMemberRole.GARRISON,
  FWGMemberRole.RECRUIT,
]);

export const LOGIN_SCOPE: UserScope = new Set([...PRIVATE_SCOPE]);
