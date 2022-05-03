import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import appendSheetData from '../../util/server/googleSheets/appendSheetData';
import { Sheet } from '../../util/server/googleSheets/types';
import isSessionValid from '../../util/server/isSessionValid';
import { authOptions } from './auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession({ req, res }, authOptions);

  if (isSessionValid(session)) {
    try {
      const body: { message: string } = JSON.parse(req.body);
      const { message } = body;

      if (!message) {
        res.status(400).json({ message: 'Invalid message' });
        res.end();
        return;
      }

      await appendSheetData({
        sheet: Sheet.FEEDBACK,
        values: [
          [
            new Date().toUTCString(),
            session.member.user.username,
            session.member.nick,
            message,
          ],
        ],
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' });
  }
}
