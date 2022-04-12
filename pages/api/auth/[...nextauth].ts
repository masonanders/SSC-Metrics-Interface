import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

const secret = process.env.SECRET
const clientId = process.env.DISCORD_CLIENT_ID
const clientSecret = process.env.DISCORD_CLIENT_SECRET

export default NextAuth({
  secret,
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId,
      clientSecret,
      authorization: { params: { scope: 'identify guilds.members.read' } }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
  },
})
