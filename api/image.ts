import { NowRequest, NowResponse } from '@vercel/node'
import { launch, Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'
import { decode, verify } from 'jsonwebtoken'
import { allowList } from './auth'
import fs from 'fs'

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
      js: String(payload.js || ''),
      css: String(payload.css || ''),
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
  css: string
  js: string
  deviceScaleFactor: number
  type: 'jpeg' | 'png'
  waitUntil: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
}

async function renderImage({
  url,
  type,
  width,
  height,
  css,
  js,
  deviceScaleFactor,
  waitUntil,
}: ScreenshotOptions) {
  let page = await getPage()
  await page.setViewport({ width, height, deviceScaleFactor })
  await page
    .goto(url, { waitUntil, timeout: 6400 })
    .catch((e) => console.error(e))
  if (js) {
    await page
      .evaluate(async (code) => {
        try {
          await eval(code)
        } catch (e) {
          const errorBox = document.createElement(
            'personal-puppeteer-error-box'
          )
          errorBox.setAttribute(
            'style',
            `position: fixed; bottom: 0; right: 0; background: red; color: white; z-index: 999999999; padding: 10px;`
          )
          errorBox.textContent = String(e)
          document.body.appendChild(errorBox)
        }
      }, js)
      .catch(console.error)
  }
  // See: https://github.com/puppeteer/puppeteer/issues/511
  await page.evaluate(async (css) => {
    const style = document.createElement('style')
    style.textContent = `
      *,
      *::after,
      *::before {
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        animation-delay: -0.0001s !important;
        animation-duration: 0s !important;
        animation-play-state: paused !important;
        caret-color: transparent !important;
        color-adjust: exact !important;
      }
      ${css}
    `
    document.head.appendChild(style)
    document.documentElement.dataset.screenshotMode = '1'
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
  }, css || '')
  const file = await page.screenshot({ type })
  return file
}

async function patchFontConfig() {
  if (fs.existsSync('/tmp/aws/fonts.conf')) {
    let contents = fs.readFileSync('/tmp/aws/fonts.conf', 'utf8')
    if (!contents.includes('<!-- patched -->')) {
      console.error('Patching fontconfig...')
      const extraRules = `
        <alias>
          <family>sans-serif</family>
          <prefer>Arimo</prefer>
        </alias>
      `
      contents = contents
        .replace('<dir>/tmp/aws/.fonts</dir>', '')
        .replace(/<\/fontconfig>/, extraRules + '<!-- patched --></fontconfig>')
      fs.writeFileSync('/tmp/aws/fonts.conf', contents)
    }
  }
}

async function getPage() {
  let page = _page
  if (!page) {
    const chromePathOnLambda = await chrome.executablePath
    const fonts = [
      'https://cdn.jsdelivr.net/gh/googlei18n/noto-emoji@master/fonts/NotoColorEmoji.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/Arimo@master/fonts/ttf/Arimo-Regular.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/Arimo@master/fonts/ttf/Arimo-Bold.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/Arimo@master/fonts/ttf/Arimo-Italic.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/Arimo@master/fonts/ttf/Arimo-BoldItalic.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSans/NotoSans-Regular.ttf',
      'https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@master/NotoSansCJK-Regular.ttc',
      'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSansThai/NotoSansThai-Regular.ttf',
    ]
    await Promise.all(fonts.map(async (f) => chrome.font(f)))
    await patchFontConfig()
    const browser = await launch({
      args: chrome.args,
      executablePath: chromePathOnLambda || '/usr/bin/chromium-browser',
      headless: true,
    })
    page = await browser.newPage()
    _page = page
  }
  return page
}
