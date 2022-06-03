import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { ADMIN_SCOPE } from '../../../../util/server/userScope';
import isMemberWithinScope from '../../../../util/server/isMemberWithinScope';
import {
  addRequestData,
  constructRequestRow,
  validateRequestTypeParam,
} from '../../../../util/requests';
import isSessionValid from '../../../../util/server/isSessionValid';
import { authOptions } from '../../auth/[...nextauth]';
import {} from '../../../../util/requests/columnMappings';
import { Request } from '../../../../util/requests/types';

type Body = {
  requests: Partial<Request>[];
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession({ req, res }, authOptions);
  const { type } = req.query;
  const body: Body = JSON.parse(req.body);

  if (
    isSessionValid(session) &&
    validateRequestTypeParam(type) &&
    isMemberWithinScope(session.member, ADMIN_SCOPE)
  ) {
    try {
      await addRequestData(type, {
        values: body.requests.map((request) =>
          constructRequestRow(type, request, session.member)
        ),
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
