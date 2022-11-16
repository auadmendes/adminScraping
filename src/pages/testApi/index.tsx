import { useEffect, useState } from "react"

export default function Scraping() {
  const [url, setUrl] = useState('https://paywithmybank.com/admin-console/home/index?errorMessage=Session+expired.+Please+login+again.&originalUrl=%2Ftransactions')
  const [mfa, setMfa] = useState('')
  const [pageTitle, setPageTitle] = useState('')

  async function getUrlScreenShot() {
    //const response = await fetch('/api/stop-payment', {
    const response = await fetch('/api/stop-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        mfa: mfa,
      })

    })

    const data = await response.text()
    console.log(mfa)
    setPageTitle(data)
  }


  return (
    <div className="flex-col gap-10">


      <div className="mt-8 max-w-[600px]">
        <span className="ml-8">Result:  {pageTitle}</span>
      </div>
    </div>
  )
}