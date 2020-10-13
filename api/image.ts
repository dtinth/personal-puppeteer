import { NowRequest, NowResponse } from '@vercel/node'
import { launch, Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

let _page: Page | null

export default async function (req: NowRequest, res: NowResponse) {
  try {
    const type = String(req.query.type) === 'jpeg' ? 'jpeg' : ('png' as const)
    const result = await renderImage('https://dt.in.th', type)
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
