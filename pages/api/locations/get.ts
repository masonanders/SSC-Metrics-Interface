import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PRIVATE_SCOPE } from '../../../util/server/userScope';
import isMemberWithinScope from '../../../util/server/isMemberWithinScope';
import isSessionValid from '../../../util/server/isSessionValid';
import { authOptions } from '../auth/[...nextauth]';
import fetchSheetData from '../../../util/server/googleSheets/fetchSheetData';
import { Sheet } from '../../../util/server/googleSheets/types';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession({ req, res }, authOptions);

  if (isSessionValid(session)) {
    try {
      const { values } = await fetchSheetData({
        sheet: Sheet.LISTS,
        from: { column: 'A', row: 4 },
        to: { column: 'C', row: 32 },
      });

      const data = values.map(([name, regionName, locationName]) => {
        return { name, region: { name: regionName, location: locationName } };
      });

      const { member } = session;
      if (isMemberWithinScope(member, PRIVATE_SCOPE)) {
        res.status(200).json({ data });
      } else {
        // TODO: Filter for public only
        res.status(200).json({ data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' });
  }
}
