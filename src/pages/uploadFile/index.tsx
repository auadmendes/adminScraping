import { useContext, useEffect, useState } from "react"
import { readFile } from "../../_lib/readSheet"

import * as XLSX from 'xlsx'
import { StopPaymentContext } from "../../contexts/StopPaymentContext"

interface Reference {

  code: string;
  reference: string;

}

export default function UploadFile() {
  const [file, setFile] = useState('')
  const { readSheet, draftkingsRefs, referencePTX, refs } = useContext(StopPaymentContext)
  const [info, setInfo] = useState<Reference[]>([])
  const arr = []

  function fileSelect(event: any) {
    let file = event.target.files[0]
    readSheet(file)
  }

  useEffect(() => {
    arr.push(referencePTX)
    //console.log(referencePTX)
    if (referencePTX.length > 0) {
      arr.push(JSON.stringify(referencePTX, null, 2))
      console.log('upload maior que zero')
    }
  }, [referencePTX])

  return (
    <div className="flex flex-1 items-center justify-center w-full h-screen">

      <div>
        {/* {JSON.stringify(referencePTX, null, 2)} */}
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Upload file {draftkingsRefs}
        </label>
        <input
          className="block w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          // value={file}

          onChange={fileSelect}
        />

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help">
          CSV, Excel, Google Sheet (MAX. 50MB).
        </p>
        {referencePTX.map((item) => {
          return (
            <div key={item[0]}>
              <p className="p-4 flex">
                {item[0]}
              </p>
            </div>
          )
        })}
      </div>
    </div >
  )
}