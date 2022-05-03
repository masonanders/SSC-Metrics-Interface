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
  from = { column: 'A', row: 1 },
  to = from,
  dimension = SheetDimension.ROWS,
  values,
}: {
  sheet: Sheet;
  from?: RangeCoordinate;
  to?: RangeCoordinate;
  dimension?: SheetDimension;
  values: string[][];
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
      valueInputOption: ValueInputOption.USER_ENTERED,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw Error();
  }
}
