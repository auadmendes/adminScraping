export function test() {
  return
}

// import { NextApiRequest, NextApiResponse } from "next";
// import puppeteer from 'puppeteer-core'
// import { getOptions } from "../../_lib/chromiumOption";


// interface TransactionInfo {
//   merchantName: string;
//   transactionId: string;
//   merchantReference: string;
//   amount: string;
//   reasonCode: string;
//   reason: string;
// }

// interface DraftkingsRequest extends NextApiRequest {
//   body: {
//     url: string;
//     mfa: string;
//     refs: Array<Array<string>>;
//     user: string;
//     password: string;
//   };
// }

// export default async function handler(req: DraftkingsRequest, res: NextApiResponse) {

//   const USER_LOGIN = req.body.user
//   const USER_PASSWORD = req.body.password

//   let browser = null;

//   const aArray = []

//   req.body.refs.map(item => {
//     aArray.push(item[6])
   
//   })

//   const ptxArray = aArray

//   const infoArray = []

//   try {

//     const options = await getOptions(true)
//     browser = await puppeteer.launch(options)

//     let page = await browser.newPage();

//     await page.goto(req.body.url);

//     await page.waitForSelector('input[name="username"]')
//     await page.type('input[name="username"]', `${USER_LOGIN}`)
  
//     await page.waitForSelector('input[name="password"]')
//     await page.type('input[name="password"]', `${USER_PASSWORD}`, { delay: 50 })
  
//     await page.waitForSelector('input[name="mfa_code"]')
//     await page.type('input[name="mfa_code"]', `${req.body.mfa}`, { delay: 50 })
  
//     await page.keyboard.press('Enter', { delay: 100 })


//     for (const ref of ptxArray) {
//       await page.waitForSelector('input[name="ppTransactionId"]')
//       await page.type('input[name="ppTransactionId"]', ref)
//       await page.keyboard.press('Enter', { delay: 100 })
//       await page.waitForSelector('.break-all', { delay: 100 })
    
//       const referenceId = await page.$eval('.break-all', el => el.textContent)

//       const trxMerchantName = await page.$$eval('table tr td', anchors => anchors.map(links => links.textContent).slice(13, 14))
//       const trIds = await page.$$eval('table tr td a', anchors => {
//         const sliceStart = (anchors[5].textContent === 'External') ? 7 : 0
//         return anchors.map(links => links.textContent).slice(sliceStart, sliceStart + 1)
//       })

    
//       infoArray.push({
//         merchantName: trxMerchantName[0],
//         transactionId: trIds[0],
//         merchantReference: referenceId,
//         amount: 'USD ' + req.body.refs[ptxArray.indexOf(ref)][3],
//         reasonCode: 'Insufficient Funds',
//         reason: 'R01',
//       })
    
//       const ppTransactionId = await page.waitForSelector('input[name="ppTransactionId"]')
//       await ppTransactionId.click({ clickCount: 3 })
//       await ppTransactionId.press('Backspace')
//     }

//     //

//   } catch (error) {
//     console.log('Olha o erro' + error)

//   } finally {
//     if (browser !== null) {
//     }
//   }

//   await browser.close()

//   res.status(201).send(infoArray)
// }