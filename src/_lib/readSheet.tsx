import * as XLSX from 'xlsx'

export function readFile(sheet: any) {

  const referencePTX = []

  const reader = new FileReader()

  reader.onload = (evt) => {
    const bstr = evt.target.result
    const workbook = XLSX.read(bstr, { type: 'binary' })
    const ws_name = workbook.SheetNames[0]
    const ws = workbook.Sheets[ws_name]
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

    data.forEach(function (item, index) {
      console.log(item[1])
      if (item[0] === 'BET365') {
        //console.log(item[5])
        referencePTX.push(item[8])
      }

    })

  }

  reader.readAsBinaryString(sheet);

  console.log(referencePTX)
}