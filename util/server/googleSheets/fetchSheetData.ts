import getGoogleSheetsApiInstance from '../../getGoogleSheetsApiInstance';
import { RangeCoordinate, Sheet } from './types';

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export default async function fetchSheetData({
  sheet,
  from,
  to,
}: {
  sheet: Sheet;
  from: RangeCoordinate;
  to: RangeCoordinate;
}) {
  try {
    const sheets = getGoogleSheetsApiInstance();
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheet}'!${from.column + from.row}:${to.column + to.row}`,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw Error();
  }
}
