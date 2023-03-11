import { NextApiRequest, NextApiResponse } from "next";

import puppeteer, { Page } from 'puppeteer-core'
import { useState } from "react";
import { getOptions } from "../../_lib/chromiumOption";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  
  const url = req.body.url
  const mfa = req.body.mfa
  const refs = req.body.refs
  
  const user = req.body.user
  const password = req.body.password

  const USER_LOGIN = user
  const USER_PASSWORD = password
  
  let result = null;
  let browser = null;

  const header = [
    'Merchant',
    'TransactionID',
    'Merchant Reference',
    'warr_amt',
    'Ret_Reason',
    'ACH_REASON_CODE'
  ]

  const aArray = []

  refs.map(item => {
    aArray.push(item[6])
   
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

    //console.log(ptxArray, ' >>>>>>')

    for (let i = 0; i < ptxArray.length; i++) {
      let ref = ptxArray[i]
      let trIds = ''
      let trxType = ''
      let trxMerchantName = ''

      // console.log('refs[2] Draftkings')
      // console.log(refs[i])

    await page.waitForSelector('input[name="ppTransactionId"]')
    await page.type('input[name="ppTransactionId"]', ref)

    await page.keyboard.press('Enter', { delay: 100 })

    await page.waitForSelector('.break-all', { delay: 100 })

    const referenceId = await page.$eval(
      '.break-all',
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



    const objectRef = {
    merchantName: trxMerchantName[0],
    transactionId: trIds[0],
    merchantReference: referenceId,
    amount: 'USD ' + refs[i][3],
    reasonCode: 'Insufficient Funds',
    reason: 'R01',

    }

    
    infoArray.push(objectRef)

    await page.waitForSelector('input[name="ppTransactionId"]')

    const ppTransactionId = await page.waitForSelector(
      'input[name="ppTransactionId"]'
    )

    await ppTransactionId.click({ clickCount: 3 })
    await ppTransactionId.press('Backspace')

    }

  
    result = await page.title();

  

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