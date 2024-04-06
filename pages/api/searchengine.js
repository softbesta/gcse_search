// const gse_url = 'https://www.googleapis.com/customsearch/v1'
const gse_url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API || ''}&cx=${process.env.GOOGLE_SEARCH_CX_ID || ''}`

export default async function handler(req, res) {
  const { query: { id: searchKey } } = req
  console.log({ searchKey })
  try {
    console.log({test_url: gse_url})
    const queryUrl = `${gse_url}&q=${searchKey}`
    const response = await fetch(queryUrl)
    const results = await response.json()

    res.status(200).json({ data: results })
    // res.status(200).json({ data: 'perfect!' })
  } catch (error) {
    res.status(500).json(error)
  }
  console.log(gse_url)
}
