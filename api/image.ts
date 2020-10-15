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
    const waitUntil = (() => {
      const allowedValues = [
        'load',
        'domcontentloaded',
        'networkidle0',
        'networkidle2',
      ] as const
      const value = String(payload.waitUntil)
      const index = allowedValues.indexOf(value as any)
      return allowedValues[index] || 'load'
    })()
    const result = await renderImage({
      url,
      type,
      width: +payload.width || 1280,
      height: +payload.height || 720,
      deviceScaleFactor: +payload.deviceScaleFactor || 1,
      waitUntil,
    })
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

interface ScreenshotOptions {
  url: string
  width: number
  height: number
  deviceScaleFactor: number
  type: 'jpeg' | 'png'
  waitUntil: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
}

async function renderImage({
  url,
  type,
  width,
  height,
  deviceScaleFactor,
  waitUntil,
}: ScreenshotOptions) {
  let page = await getPage()
  await page.setViewport({ width, height, deviceScaleFactor })
  await page.goto(url, { waitUntil })
  const file = await page.screenshot({ type })
  return file
}

async function getPage() {
  let page = _page
  if (!page) {
    await chrome.font(
      'https://cdn.jsdelivr.net/gh/googlei18n/noto-emoji@master/fonts/NotoColorEmoji.ttf'
    )
    await chrome.font(
      'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSansThai/NotoSansThai-Regular.ttf'
    )
    const browser = await launch({
      args: chrome.args,
      executablePath:
        (await chrome.executablePath) || '/usr/bin/chromium-browser',
      headless: true,
    })
    page = await browser.newPage()
    _page = page
  }
  return page
}
