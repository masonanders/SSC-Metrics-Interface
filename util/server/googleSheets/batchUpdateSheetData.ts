import getGoogleSheetsApiInstance from '../../getGoogleSheetsApiInstance';
import { RangeCoordinate, Sheet, SheetBool, ValueInputOption } from './types';

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export default async function batchUpdateSheetData({
  sheet,
  data: updateData,
  valueInputOption = ValueInputOption.USER_ENTERED,
}: {
  sheet: Sheet;
  data: {
    values: (string | number | SheetBool)[][];
    from: RangeCoordinate;
    to: RangeCoordinate;
  }[];
  valueInputOption?: ValueInputOption;
}) {
  try {
    const sheets = getGoogleSheetsApiInstance();
    const { data: responseData } = await sheets.spreadsheets.values.batchUpdate(
      {
        spreadsheetId,
        requestBody: {
          valueInputOption,
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
