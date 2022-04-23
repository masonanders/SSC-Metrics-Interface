import axios from 'axios';

export default function getDiscordApiInstance(accessToken: string) {
  return axios.create({
    baseURL: 'https://discord.com/api/v7',
    timeout: 1000,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
