# personal-puppeteer

This is a **personal web page screenshotting service**. Basically, it exposes an
API that I can use to generate screenshot of any URL.

By _personal_ I mean that only I can use it. It is secured with JWT. But it is
open source, and you can run your own instance.

It is **deployed to [Vercel](https://vercel.com/)** and is inspired by
[Vercel’s Open Graph Image as a Service](https://github.com/vercel/og-image).
The main difference is that this service is designed to be reusable across many
use cases. It can capture arbitrary URLs and run arbitrary code.

It is multi-tenant. I can [reuse this service](#adding-new-tenant) without
having to share secrets.

## Usage

See [the website](https://snapit.now.sh/) for usage information.

## Adding a new tenant

1. Generate an RS256 keypair for JWT signing.

2. Edit [api/auth.ts](./api/auth.ts) and add a new entry to the `allowList`.

3. Within less than a minute Vercel will deploy the changes allowing the new
   tenant to use the API right away.

## Development

```sh
yarn
yarn vercel dev
```

## Deployment

```sh
yarn
yarn vercel
```
