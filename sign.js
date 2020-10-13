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
        { url: args.url, width: args.width, height: args.height },
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
