require('yargs')
  .demandCommand()
  .strict()
  .help()
  .command(
    '$0 <url>',
    'Signs a JWT',
    {
      url: {
        type: 'string',
      },
      waitUntil: {
        type: 'string',
      },
      deviceScaleFactor: {
        type: 'number',
        alias: 's',
        default: 1,
      },
      width: {
        type: 'number',
        alias: 'w',
        default: 1280,
      },
      height: {
        type: 'height',
        alias: 'h',
        default: 720,
      },
    },
    async (args) => {
      const key = require('fs').readFileSync(
        require.resolve('./private/jwtRS256.key')
      )
      const jwt = require('jsonwebtoken').sign(
        {
          url: args.url,
          width: args.width,
          height: args.height,
          waitUntil: args.waitUntil,
          deviceScaleFactor: args.deviceScaleFactor,
        },
        key,
        {
          algorithm: 'RS256',
          noTimestamp: true,
          issuer: 'dtinth',
        }
      )
      console.log(jwt)
    }
  )
  .parse()
