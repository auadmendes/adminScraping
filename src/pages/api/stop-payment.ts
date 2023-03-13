import { NextApiRequest, NextApiResponse } from "next";

import puppeteer from 'puppeteer-core'
import { getOptions } from "../../_lib/chromiumOption";


interface DraftkingsRequest extends NextApiRequest {
  body: {
    url: string;
    mfa: string;
    refs: Array<Array<string>>;
    user: string;
    password: string;
  };
}

export default async function handler(req: DraftkingsRequest, res: NextApiResponse) {

  
  
}