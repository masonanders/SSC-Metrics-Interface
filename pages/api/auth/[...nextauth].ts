import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { LOGIN_SCOPE } from "../../../util/constants"
import { HTTPNotFoundError } from "../../../util/customErrors"
import fetchDiscordMember from "../../../util/fetchDiscordMember"
import isExpired from "../../../util/isExpired"
import isMemberWithinScope from "../../../util/isMemberWithinScope"

const secret = process.env.SECRET
const clientId = process.env.DISCORD_CLIENT_ID
const clientSecret = process.env.DISCORD_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
  secret,
  providers: [
    DiscordProvider({
      clientId,
      clientSecret,
      authorization: { params: { scope: 'identify guilds.members.read' } }
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
          memberExp: Math.floor(Date.now() / 1000) + (60 * 5),
        }
      }
      if (!token.member || typeof token.memberExp !== 'number' || isExpired(token.memberExp)) {
        try {
          const accessToken = account.access_token
          const member = await fetchDiscordMember(accessToken)
          return {
            ...token,
            member,
            memberExp: Math.floor(Date.now() / 1000) + (60 * 5)
          }
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { member: _member, memberExp: _memberExp, ...newToken } = token
          return { ...newToken, error }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.error || !token.member || !isMemberWithinScope(token.member, LOGIN_SCOPE)) {
        return { ...session, error: token.error, forceSignout: true }
      }
      session.member = token.member
      return session
    },
    async signIn({ user, account }) {
      try {
        const accessToken = account.access_token
        const member = await fetchDiscordMember(accessToken)
        if (!isMemberWithinScope(member, LOGIN_SCOPE)) {
          throw new HTTPNotFoundError('Missing login scope')
        }
        user.member = member
        return true
      } catch (error) {
        if (error instanceof HTTPNotFoundError) {
          return '/403'
        }
      }
      return '/500'
    }
  },
}


export default NextAuth(authOptions)
