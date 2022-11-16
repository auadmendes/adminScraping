import { useContext, useState } from "react"
import { StopPaymentContext } from "../../contexts/StopPaymentContext"

export function Header() {
  const [url, setUrl] = useState('https://paywithmybank.com/admin-console/home/index?errorMessage=Session+expired.+Please+login+again.&originalUrl=%2Ftransactions')
  const [mfa, setMfa] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const { readSheet, createFiltered, referencePTX, getDraftkingsVip, getStopPayment } = useContext(StopPaymentContext)

  function fileSelect(event: any) {
    let file = event.target.files[0]

    if (isChecked) {
      createFiltered(file)
    } else {
      readSheet(file)
    }
  }

  const info = {
    url: url,
    mfa: mfa,
    refs: referencePTX
  }

  function handleApi() {
    if (isChecked) {
      getStopPayment(info)
    }
    getDraftkingsVip(info)
  }

  function handleCheckBox() {
    setIsChecked(!isChecked)
  }

  return (
    <header
      className="flex flex-1 justify-start w-full min-w-screen flex-col bg-gray-300 h-[150px] pt-8 pl-4">
      <h1 className="text-gray-700">Stop Payment</h1>

      <div className="flex flex-row gap-8">

        <div className="flex flex-row mt-4 items-center justify-center">

          <div>
            <input
              className="max-w-[200px] p-3 text-gray-600"
              placeholder="Type the MFA"
              type="text"
              value={mfa} onChange={(e) => setMfa(e.target.value)}
            />
          </div>

          <div>
            <button
              className="h-[50px] max-w-[300px] w-[200px] bg-Trutly text-gray-800 text-lg  p-1 ml-4"
              onClick={handleApi}>
              Send
            </button>
          </div>

        </div>

        <div>
          <div className="flex gap-2 items-center">
            <label className="block mb-2 text-sm font-medium text-gray-900">Upload file |</label>
            <input type="checkbox" name="Stop Payment" id="SP" checked={isChecked} onChange={handleCheckBox}
              className="block w-5 h-5 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-2" />
            <label> Stop Payment</label>
          </div>

          <input
            className="block text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"

            onChange={fileSelect}
          />

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-700"
            id="file_input_help">
            Excel, Google Sheet (Ex. Return_File0421 - {referencePTX.length}).
          </p>
        </div>
      </div>
    </header>
  )
}