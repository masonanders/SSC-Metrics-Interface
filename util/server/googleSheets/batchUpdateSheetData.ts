import getGoogleSheetsApiInstance from '../../getGoogleSheetsApiInstance';
import { RangeCoordinate, Sheet, ValueInputOption } from './types';

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export default async function batchUpdateSheetData({
  sheet,
  data: updateData,
}: {
  sheet: Sheet;
  data: {
    values: (string | number)[][];
    from: RangeCoordinate;
    to: RangeCoordinate;
  }[];
}) {
  try {
    const sheets = getGoogleSheetsApiInstance();
    const { data: responseData } = await sheets.spreadsheets.values.batchUpdate(
      {
        spreadsheetId,
        requestBody: {
          valueInputOption: ValueInputOption.RAW,
          data: updateData.map(({ values, from, to }) => ({
            range: `'${sheet}'!${from.column + from.row}:${to.column + to.row}`,
            values,
          })),
        },
      }
    );

    return responseData;
  } catch (error) {
    console.log(error);
    throw Error();
  }
}
