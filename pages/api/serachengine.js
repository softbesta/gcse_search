const gse_url = 'https://www.googleapis.com/customsearch/v1'
export default async function handler({ req, res }) {
  try {
    
    res.status(200).json({ data: 'perfect!' })
  } catch (error) {
    res.status(500).json(error)
  }
  console.log(gse_url)
}