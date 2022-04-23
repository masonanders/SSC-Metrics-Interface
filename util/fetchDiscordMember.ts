import { HTTPNotFoundError, HTTPTooManyRequestsError } from './customErrors';
import getDiscordApiInstance from './getDiscordApiInstance';

const fwgGuildId = process.env.FWG_GUILD_ID;

export default async function fetchDiscordMember(
  accessToken: AccessToken
): Promise<DiscordMember> {
  try {
    const discordApi = getDiscordApiInstance(accessToken);
    const { data: member } = await discordApi.get(
      `/users/@me/guilds/${fwgGuildId}/member`
    );
    return member;
  } catch (error) {
    const statusCode = parseInt(error?.response?.status);
    if (statusCode === 404) {
      throw new HTTPNotFoundError(error);
    } else if (statusCode === 429) {
      throw new HTTPTooManyRequestsError(error);
    } else {
      throw Error();
    }
  }
}
