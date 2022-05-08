declare module 'next-auth' {
  import type { UserScopeLabel } from './util/server/userScope';

  export interface User {
    member?: DiscordMember;
  }

  export interface Session {
    error?: unknown;
    forceSignout?: boolean;
    member?: DiscordMember;
    scope?: UserScopeLabel[];
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    member?: DiscordMember;
    memberExp?: number;
    error?: unknown;
  }
}

export declare global {
  import { FWGMemberRoles } from './util/constants';

  type AccessToken = string;
  type ISO8601Timestamp = string;
  type DateString = string;
  type Snowflake = string;

  interface DiscordUser {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
  }

  interface DiscordMember {
    user?: DiscordUser;
    nick?: string;
    avatar?: string;
    roles: FWGMemberRoles[];
    joined_at: ISO8601Timestamp;
    premium_since?: ISO8601Timestamp;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: ISO8601Timestamp;
  }

  enum UserScopeLabel {
    DIRECTOR = 'DIRECTOR',
    ADMIN = 'ADMIN',
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
    LOGIN = 'LOGIN',
  }
}
