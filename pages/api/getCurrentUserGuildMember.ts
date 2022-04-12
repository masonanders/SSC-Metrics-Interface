import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import getDiscordApiInstance from "../../util/getDiscordApiInstance"

const secret = process.env.SECRET
const fwgGuildId = process.env.FWG_GUILD_ID

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret })

  if (token) {
    try {
      const discordApi = getDiscordApiInstance({ token })
      const request = await discordApi.get(`/users/@me/guilds/${fwgGuildId}/member`)
      const { data: member } = request
      res.status(200).json({ member })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' })
  }
}
