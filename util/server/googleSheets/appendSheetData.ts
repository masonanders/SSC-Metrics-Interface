import getGoogleSheetsApiInstance from '../../getGoogleSheetsApiInstance';
import {
  RangeCoordinate,
  Sheet,
  SheetDimension,
  ValueInputOption,
} from './types';

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export default async function appendSheetData({
  sheet,
  dimension = SheetDimension.ROWS,
  valueInputOption = ValueInputOption.USER_ENTERED,
  data: { from = { column: 'A', row: 1 }, to = from, values },
}: {
  sheet: Sheet;
  dimension?: SheetDimension;
  valueInputOption?: ValueInputOption.USER_ENTERED;
  data: {
    from?: RangeCoordinate;
    to?: RangeCoordinate;
    values: (string | number | boolean | undefined | null)[][];
  };
}) {
  try {
    const sheets = getGoogleSheetsApiInstance();
    const { data } = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheet}'!${from.column + from.row}:${to.column + to.row}`,
      requestBody: {
        range: `'${sheet}'!${from.column + from.row}:${to.column + to.row}`,
        majorDimension: dimension,
        values,
      },
      valueInputOption,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw Error();
  }
}
