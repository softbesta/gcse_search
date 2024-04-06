import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const handleSpreadSheet = async () => {
    try {
      console.log('clicked')
      const response = await fetch(`/api/spreadsheet`)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const result = await response.json()
      console.log({ result })

    } catch (error) {
      console.log('error occurred')
    }
  }
  const handleGCSE = async () => {
    console.log('clicked GCSE')
    
  }

  return (
    <>
      <div>
        <button onClick={() => handleSpreadSheet()}>Test Google Spread Sheet</button>
        <button onClick={() => handleGCSE()}>Programmable Search Engine</button>
      </div>
    </>
  );
}
