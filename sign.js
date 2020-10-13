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
    },
    async (args) => {
      const key = require('fs').readFileSync(
        require.resolve('./private/jwtRS256.key')
      )
      const jwt = require('jsonwebtoken').sign({ url: args.url }, key, {
        algorithm: 'RS256',
        noTimestamp: true,
        issuer: 'dtinth',
      })
      console.log(jwt)
    }
  )
  .parse()
