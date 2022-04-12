import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import getDiscordApiInstance from "../../util/getDiscordApiInstance"

const secret = process.env.SECRET

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret })

  if (token) {
    try {
      const discordApi = getDiscordApiInstance({ token })
      const request = await discordApi.get(`/users/@me`)
      const { data: user } = request
      res.status(200).json({ user })
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' })
  }
}
