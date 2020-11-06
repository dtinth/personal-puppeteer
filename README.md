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

&rarr; Read the [project introduction post][intro] for more info.

[![](https://capture.the.spacet.me/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL2Rldi50by9kdGludGgvYnVpbGRpbmctYS1wZXJzb25hbC1idXQtbXVsdGktdGVuYW50LXdlYi1wYWdlLXNjcmVlbnNob3R0aW5nLXNlcnZpY2Utd2l0aC1wdXBwZXRlZXItYW5kLXZlcmNlbC0xNWIiLCJ3aWR0aCI6MTQwMCwiaGVpZ2h0Ijo4MDAsImRldmljZVNjYWxlRmFjdG9yIjoxLCJpc3MiOiJkdGludGgifQ.HwtKiMtHuGdDK9-WzjP1Q-6Nht5ISkYhopCIbZeJmjcMEumwuF1fvAsUjxZnIv2FmPm0qD1snU2zBssXX2OlHCvlj2E1dDIqY3L5DMmusUxoxclwVykgDerqwp1noN8rhgmxynqXZrW_9HNV1nchFf7M0LCRDcfEjP-4qomWh-PWgRQYzKNFXSlUi8goEuoqrMSyijYHtVI9ne1PhPjRA6Vns9ASejsGbkxS3nwf12cbioRMeXXeyQkbm59zpH6XKTYjV9qqOjQeisNfRWevENRyGyRHg8PcZoRPQYpBHzERQksmUDdRFFjGCY5ZUzCyMo0WpbvgQrZdUIpftUbVpg.png)][intro]

[intro]: https://dev.to/dtinth/building-a-personal-but-multi-tenant-web-page-screenshotting-service-with-puppeteer-and-vercel-15b

## Usage

See [the website](https://capture.the.spacet.me/) for usage information.

[![](https://capture.the.spacet.me/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3NuYXBpdC5ub3cuc2gvIiwid2lkdGgiOjgzOCwiaGVpZ2h0Ijo2ODAsImRldmljZVNjYWxlRmFjdG9yIjoyLCJpc3MiOiJkdGludGgifQ.SeNCDZ12Dh_QP49GViwWA0CiKUrf268uPDjWF2B8c8pfGoKVTAZpm3u9Lykd4BP1ucjbkzUZ0g3mZVsh1CeilVPH58OI7GUImSuiWRcxXhMND_FwOTQrSf8YKmt22kqZyrn8gDsQdD22v-V1HngM1J3tE9oTC5WrT3rrHjP1bfmjEzHw5UUJ8yBYnvjyWmPlgYUOACCAszp5gwohnE4OGgPGPjRTbNUhn3cGyCFpvoOY5W7V1-dBkVfchhZvjwOVO10PCKO2c3CIOawmiQeU61XOnYlMUv1J8BeCSIY6-7pWzi8hzgJ_zwBo0nPpZgArRcOK8OoafNoYBOrnNtdWKA.png)](https://snapit.now.sh/)

## Adding a new tenant

**Note:** Do not send pull requests to this repository to add a new tenant. Instead, please deploy `personal-puppeteer` to your own account.

1. Generate an RS256 keypair for JWT signing.

2. Edit [api/auth.ts](./api/auth.ts) and add a new entry to the `allowList`.

3. Within less than a minute Vercel will deploy the changes allowing the new
   tenant to use the API right away.

## Development

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/dtinth/personal-puppeteer)

```sh
yarn
yarn vercel login
yarn vercel dev
```

## Deployment

```sh
yarn
yarn vercel
```
