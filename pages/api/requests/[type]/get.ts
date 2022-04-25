import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PRIVATE_SCOPE } from '../../../../util/constants';
import isMemberWithinScope from '../../../../util/server/isMemberWithinScope';
import {
  getRequestData,
  processRows,
  requestTypeSheetEndColumnMap,
  requestTypeSheetRequestIdCellMap,
  updateRequestData,
  validateRequestTypeParam,
} from '../../../../util/requests';
import isSessionValid from '../../../../util/server/isSessionValid';
import { authOptions } from '../../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession({ req, res }, authOptions);
  const { type } = req.query;

  if (isSessionValid(session) && validateRequestTypeParam(type)) {
    try {
      const data = await getRequestData(
        type,
        requestTypeSheetEndColumnMap[type]
      );
      const { rows, rowsWithoutIds } = processRows(data, type);

      if (rowsWithoutIds.length) {
        await updateRequestData(
          type,
          rowsWithoutIds.map((row) => ({
            values: [[row.id]],
            from: {
              column: requestTypeSheetRequestIdCellMap[type],
              row: row.rowNum,
            },
            to: {
              column: requestTypeSheetRequestIdCellMap[type],
              row: row.rowNum,
            },
          }))
        );
      }

      const { member } = session;
      if (isMemberWithinScope(member, PRIVATE_SCOPE)) {
        res.status(200).json({ rows });
      } else {
        // TODO: Filter for public only
        res.status(200).json({ rows });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' });
  }
}
