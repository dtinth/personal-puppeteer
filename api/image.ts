import { NowRequest, NowResponse } from '@vercel/node'
import { launch, Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'
import { decode, verify } from 'jsonwebtoken'
import { allowList } from './auth'

let _page: Page | null

export default async function (req: NowRequest, res: NowResponse) {
  try {
    const jwt = String(req.query.jwt)
    const issuer = String((decode(jwt) as any)?.iss)
    if (!Object.prototype.hasOwnProperty.call(allowList, issuer)) {
      res.status(401).json({ error: { message: 'Unrecognized issuer.' } })
      return
    }
    const registeredIssuer = allowList[issuer]
    const payload = verify(jwt, registeredIssuer.publicKey, {
      algorithms: ['RS256'],
      issuer: issuer,
    }) as any
    const type = String(req.query.type) === 'jpeg' ? 'jpeg' : ('png' as const)
    const url = String(payload.url)
    const result = await renderImage(url, type)
    res.setHeader('Content-Type', 'image/' + type)
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    res.send(result)
  } catch (error) {
    res.send('Error')
    console.error(error)
  }
}

async function renderImage(url: string, type: 'jpeg' | 'png') {
  let page = _page
  if (!page) {
    const browser = await launch({
      args: chrome.args,
      executablePath:
        (await chrome.executablePath) || '/usr/bin/chromium-browser',
      headless: true,
    })
    page = await browser.newPage()
    _page = page
  }
  await page.setViewport({ width: 2048, height: 1170 })
  await page.goto(url, { waitUntil: 'load' })
  const file = await page.screenshot({ type })
  return file
}
