import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { LOGIN_SCOPE } from '../../../util/userScope';
import {
  HTTPNotFoundError,
  HTTPTooManyRequestsError,
} from '../../../util/customErrors';
import fetchDiscordMember from '../../../util/fetchDiscordMember';
import isExpired from '../../../util/isExpired';
import isMemberWithinScope from '../../../util/server/isMemberWithinScope';

const secret = process.env.SECRET;
const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  secret,
  providers: [
    DiscordProvider({
      clientId,
      clientSecret,
      authorization: { params: { scope: 'identify guilds.members.read' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user?.member) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          member: user.member,
          memberExp: getNewDiscordMemberExpiryTime(),
        };
      }
      if (
        !token.member ||
        typeof token.memberExp !== 'number' ||
        isExpired(token.memberExp)
      ) {
        try {
          const accessToken =
            account?.access_token ?? (token.accessToken as string);
          const member = await fetchDiscordMember(accessToken);
          console.log('jwt:refetch', { user, member });
          return {
            ...token,
            member,
            memberExp: getNewDiscordMemberExpiryTime(),
          };
        } catch (error) {
          console.log('jwt:catch', error);
          if (error instanceof HTTPTooManyRequestsError) {
            return { ...token, memberExp: getNewDiscordMemberExpiryTime() };
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { member: _member, memberExp: _memberExp, ...newToken } = token;
          return { ...newToken, error };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) delete session.user.email;
      if (
        token.error ||
        !token.member ||
        !isMemberWithinScope(token.member, LOGIN_SCOPE)
      ) {
        return { ...session, forceSignout: true };
      }
      session.member = token.member;
      return session;
    },
    async signIn({ user, account }) {
      try {
        const accessToken = account.access_token;
        const member = await fetchDiscordMember(accessToken);
        console.log('signIn:fetch', { user, member });
        if (!isMemberWithinScope(member, LOGIN_SCOPE)) {
          throw new HTTPNotFoundError('Missing login scope');
        }
        user.member = member;
        return true;
      } catch (error) {
        if (error instanceof HTTPNotFoundError) {
          console.log('jwt:catch:404', { user, error });
          return '/403';
        }
        console.log('jwt:catch', { error });
      }
      return '/500';
    },
  },
};

function getNewDiscordMemberExpiryTime() {
  return Math.floor(Date.now() / 1000) + 60 * 10;
}

export default NextAuth(authOptions);
