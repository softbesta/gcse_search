import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
// import { search_data } from '../constants'

export default function Home() {
  const [searchKey, setSearchKey] = useState('')
  const [resultItems, setResultItems] = useState([])
  const [pageNum, setPageNum] = useState(0)

  useEffect(() => {
    console.log({ resultItems })
  }, [resultItems])

  const handleGCSE = async () => {
    console.log('clicked GCSE')
    if (!searchKey) return
    try {
      const response = await fetch(`/api/searchengine?id=${searchKey}&page=${pageNum}`)
      setPageNum(v => v + 1)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const search_data = await response.json()

      // Use Mocked result for test.
      if (search_data.data.items.length <= 0) setResultItems([])
      const updated_at = (new Date()).toLocaleString()
      const updates = search_data.data.items.map((item) => ({
        'Display Link': item.displayLink,
        'Title': item.title,
        'Link': item.link,
        'Updated at': updated_at
      }))
      console.log({ updates })
      setResultItems(updates)
    } catch (error) {
      console.log('error occurred')
    }
  }
  const handleSaveToSheet = async () => {
    if (resultItems.length <= 0) return
    try {
      console.log('clicked - Save to Spread Sheet')
      const response = await fetch(`/api/spreadsheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultItems)
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const result = await response.json()
      console.log({ result })

    } catch (error) {
      console.log('error occurred')
    }
  }

  return (
    <>
      <div>
        <div>
          <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
          <button onClick={() => handleGCSE()}>Programmable Search Engine</button>
          <br />
          <button onClick={() => handleSaveToSheet()}>Save Results to Google Spread Sheet</button>
        </div>
        <h3>Page number: {pageNum}</h3>
        <h3>Items: {resultItems.length}</h3>
        <div>
          {resultItems.map((item, index) => {
            return <div key={index}>
              <p>{item.Title}</p>
              <pre>{JSON.stringify(item, '', 2)}</pre>
            </div>
          })}
        </div>
      </div>
    </>
  );
}
