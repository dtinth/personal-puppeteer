# personal-puppeteer

This is a **personal web page screenshotting service**. Basically, it exposes an
API that I can use to generate screenshot of any URL.

By _personal_ I mean that only I can use it. It is secured with JWT. But it is
open source, and you can run your own instance.

It is **deployed to [Vercel](https://vercel.com/)** and is inspired by
[Vercel’s Open Graph Image as a Service](https://github.com/vercel/og-image).
The main difference is that this service is designed to be reusable across many
use cases. It can capture arbitrary URLs and run arbitrary code.

It is multi-tenant. I can [reuse this service](#adding-a-new-tenant) without
having to share secrets.

## Usage

See [the website](https://snapit.now.sh/) for usage information.

[![](https://snapit.now.sh/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3NuYXBpdC5ub3cuc2gvIiwid2lkdGgiOjgzOCwiaGVpZ2h0Ijo2ODAsImRldmljZVNjYWxlRmFjdG9yIjoyLCJpc3MiOiJkdGludGgifQ.SeNCDZ12Dh_QP49GViwWA0CiKUrf268uPDjWF2B8c8pfGoKVTAZpm3u9Lykd4BP1ucjbkzUZ0g3mZVsh1CeilVPH58OI7GUImSuiWRcxXhMND_FwOTQrSf8YKmt22kqZyrn8gDsQdD22v-V1HngM1J3tE9oTC5WrT3rrHjP1bfmjEzHw5UUJ8yBYnvjyWmPlgYUOACCAszp5gwohnE4OGgPGPjRTbNUhn3cGyCFpvoOY5W7V1-dBkVfchhZvjwOVO10PCKO2c3CIOawmiQeU61XOnYlMUv1J8BeCSIY6-7pWzi8hzgJ_zwBo0nPpZgArRcOK8OoafNoYBOrnNtdWKA.png)](https://snapit.now.sh/)

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
