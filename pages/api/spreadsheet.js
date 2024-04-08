import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
const doc = new GoogleSpreadsheet('1kc2mOR0nH8ZIa2aF5aVSUWDQ93Vb1mrkmI_TWbzU4e4', serviceAccountAuth);

export default async function handler(req, res) {
  const { body: items } = req
  if (items.length <= 0) {
    res.status(200).json({ message: 'no items to save' })
  }
  try {
    await doc.loadInfo()
    const sheet1 = doc.sheetsByIndex[0]

    const headerNames = Object.keys(items[0])
    console.log({headerNames})
    await sheet1.setHeaderRow(headerNames)

    await sheet1.addRows(items)
    res.status(200).json({ message: 'successfully saved' })

    console.log({ items })
  } catch (error) {
    res.status(500).json(error);
  }
}
