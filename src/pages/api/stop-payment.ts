import { NextApiRequest, NextApiResponse } from "next";

import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from "../../_lib/chromiumOption";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const USER_LOGIN = process.env.ADMIN_CONSOLE_LOGIN
  const USER_PASSWORD = process.env.ADMIN_CONSOLE_PASS
  const pageDetails = "https://paywithmybank.com/admin-console/transactions/details/"
  const url = req.body.url
  const mfa = req.body.mfa
  const refs = req.body.refs

  
  let result = null;
  let browser = null;

  const aArray = []


  refs.map(item => {
    aArray.push(item[8])
    //console.log(item[8])
  })

  const ptxArray = aArray


  const infoArray = []
  //infoArray.push(header)
  try {

    const options = await getOptions(true)
    browser = await puppeteer.launch(options)

    let page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('input[name="username"]')
    await page.type('input[name="username"]', `${USER_LOGIN}`)
  
    await page.waitForSelector('input[name="password"]')
    await page.type('input[name="password"]', `${USER_PASSWORD}`, { delay: 50 })
  
    await page.waitForSelector('input[name="mfa_code"]')
    await page.type('input[name="mfa_code"]', `${mfa}`, { delay: 50 })
  
    await page.keyboard.press('Enter', { delay: 100 })

    for (let i = 0; i < ptxArray.length; i++) {
      let ref = ptxArray[i]
      let trIds = ''
      let trxType = ''
      let trxMerchantName = ''

    await page.waitForSelector('input[name="ppTransactionId"]')

    await page.type('input[name="ppTransactionId"]', ref)

    await page.keyboard.press('Enter', { delay: 300 })

    await page.waitForSelector('.merchant-reference', { delay: 100 })

    const referenceId = await page.$eval(
      '.merchant-reference',
      el => el.textContent
    )

    trxType = await page.$$eval('table tr td', anchors => {
      return anchors.map(links => links.textContent).slice(5, 6)
    })

    trxMerchantName = await page.$$eval('table tr td', anchors => {
      return anchors.map(links => links.textContent).slice(13, 14)
    })

    if (trxType[0] === 'External') {
      trIds = await page.$$eval('table tr td a', anchors => {
        return anchors.map(links => links.textContent).slice(7, 8)
      })
    } else {
      trIds = await page.$$eval('table tr td a', anchors => {
        return anchors.map(links => links.textContent).slice(0, 1)
      })
    }

    const amount = await page.$$eval('table tr td', anchors => {
      return anchors.map(links => links.textContent).slice(15, 16)
    })

    await page.goto(`${pageDetails}${trIds}`, {
      waitUntil: 'load',
      timeout: 0
    })

    const signatureRef = await page.$$eval(
      '#fi-transaction .table-condensed tbody tr td',
      anchors => {
        return anchors.map(links => links.textContent).slice(7, 8)
      }
    )

    const trustlyUserName = await page.$$eval(
      '#fi-retrieved-info > .table-hover tbody tr td',
      anchors => {
        return anchors.map(links => links.textContent).slice(7, 8)
      }
    )

    const objectRef = {
    customerName: trustlyUserName[0],
    merchantName: trxMerchantName,
    reason: refs[i][4],
    amount: refs[i][3],
    pasClerkPtx: ref,
    refID: refs[i][6],
    merchantReference: referenceId,
    transactionId: trIds[0],
    signatureRef: signatureRef,
    reasonCode: refs[i][5],
    log: refs[i][7],
    }

  // 'DRAFTKINGS', 0
  // 44045960, 1
  // 'Davison Avery', 2
  // 500, 3
  // 'Hold on Funds', 4
  // 'R16', 5
  // 20221107, 6
  // 44875, 8
  // 'ptx-HNHkHX0Osarr0a2udgomy_t4', 9
  // '223144426948' 10
    
    infoArray.push(objectRef)

    await page.goBack()

    await page.waitForSelector('input[name="ppTransactionId"]')

    const ppTransactionId = await page.waitForSelector(
      'input[name="ppTransactionId"]'
    )

    await ppTransactionId.click({ clickCount: 3 })
    await ppTransactionId.press('Backspace')

    }
    // await page.waitForFunction(() => {
    //   const mfa = document.getElementById('mfa_code').textContent
    //   return mfa.length === 6
    // })
  
    

  //await page.type('input[name="mfa_code"]', `515623`, { delay: 50 })

  // await page.waitForFunction(() => {
  //   console.log('Meu test')
  // })

  // setTimeout(() => {
  //   console.log("Delayed for 1 second.");
  // }, 5000)

  // await page.waitForFunction(() => {
  //   const mfa = document.getElementById('mfa_code').nodeValue 
  //   return mfa.length === 6

  // });

  //await page.keyboard.press('Enter', { delay: 100 })
  
    result = await page.title();
    //createVipSheets([infoArray])
  

  } catch (error) {
    console.log('Olha o erro' + error)
    //return callback(error);
  } finally {
    if (browser !== null) {
      //await browser.close();
    }
  }
 //console.log(result)

  await browser.close()

  //console.log(infoArray)

   //res.status(200).json({infoArray})
  res.status(201).send(infoArray)
}