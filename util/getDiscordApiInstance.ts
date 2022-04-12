import axios from "axios";
import { JWT } from "next-auth/jwt";

export default function getDiscordApiInstance(context: { token: JWT }) {
  if (!context.token.accessToken) throw new Error('No access token')
  return axios.create({
    baseURL: 'https://discord.com/api/v7',
    timeout: 1000,
    headers: { Authorization: `Bearer ${context.token.accessToken}` }
  })
}
