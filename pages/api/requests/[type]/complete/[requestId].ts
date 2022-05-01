import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import {
  getRequestData,
  processRows,
  updateRequestData,
  validateRequestTypeParam,
} from '../../../../../util/requests';
import {
  requestTypeSheetCompletedColumnMap,
  requestTypeSheetEndColumnMap,
  requestTypeSheetTimeCompletedColumnMap,
} from '../../../../../util/requests/columnMappings';
import {
  SheetBool,
  ValueInputOption,
} from '../../../../../util/server/googleSheets/types';
import isSessionValid from '../../../../../util/server/isSessionValid';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession({ req, res }, authOptions);
  const { type, requestId } = req.query;

  if (isSessionValid(session) && validateRequestTypeParam(type) && requestId) {
    try {
      const data = await getRequestData(
        type,
        requestTypeSheetEndColumnMap[type]
      );
      const { rows } = processRows(data, type);

      const row = rows.find((row) => row.id === requestId);

      if (!row) {
        res.status(404).json({ message: 'Order not found' });
        res.end();
        return;
      } else if (row.completed) {
        res.status(423).json({ message: 'Order is already accepted' });
        res.end();
        return;
      }

      await updateRequestData(
        type,
        [
          {
            values: [[SheetBool.TRUE]],
            from: {
              column: requestTypeSheetCompletedColumnMap[type],
              row: row.rowNum,
            },
            to: {
              column: requestTypeSheetCompletedColumnMap[type],
              row: row.rowNum,
            },
          },
          {
            values: [[new Date().toUTCString()]],
            from: {
              column: requestTypeSheetTimeCompletedColumnMap[type],
              row: row.rowNum,
            },
            to: {
              column: requestTypeSheetTimeCompletedColumnMap[type],
              row: row.rowNum,
            },
          },
        ],
        ValueInputOption.USER_ENTERED
      );

      res.status(200).json({ succss: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: 'Endpoint restricted' });
  }
}
