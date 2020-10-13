import { NowRequest, NowResponse } from '@vercel/node'

export const allowList: { [iat: string]: AllowListItem } = {
  dtinth: {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzToF2nyjDcJIjsYOPUdi
karObvmc5XjWYoDvlhNhbQmwr7DhXeoIbxY3+cEzXzcS15bGwuXBJNB9I7q5CAjn
UBaJPB7zZ1kMlSvJdK8WGFCMfZEqaT5s6+CqMRDuAaaKxluHG9jKNecwAd0iZDJK
SNZIl0qRljHbzrSPvCLHw5BUO4cI8J5CeCOMDYZXB/4icmVSZSe1ynt8mFjcKhAN
774MCCB/7uzd81MuQSu0l/gDQpiCW61jaEMsmAsI8X3c4bCiprm5/prefdRB8KLl
sl1ClPODqzkQAPi+tOYyh01Sx6zzY1lkCQHNLt+jAX20dUd/7aDRcns3bq+l4PLl
/wIDAQAB
-----END PUBLIC KEY-----`,
  },
  'journal-web': {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1My5s4/RqBAx8KObzEAZ
WrZ2e5SWTuG2eEWg7U/q8pyGj/2yRdr9Z4XPT1yNp4bMEIiXvt9CQy47wv3Uegks
e6tL1CVrFXp8rrcvxTFnIv3WmZ1lqive1QPzbmWHmv2mnfNVYh/aUJ1Jy72PjWu3
ZM2InLYGYPQlzFr5Bs/atZFMViGQX2DZP6NJAp4UQwSuWAlTPXQi38KQNL7g4k/q
7lTGnN6njVbzvX6j6R41UpA+qg2fixwefFnC5qgxkZtr1k5/HrkKp+L2QqAKjkAB
INX2K7McB36kn4BGY1rhTBZyfucsq22WdShT3cpIfoUbVZYlI49N5hpUb8Lqp7iA
YQIDAQAB
-----END PUBLIC KEY-----`,
  },
}

type AllowListItem = {
  publicKey: string
}

export default async function (req: NowRequest, res: NowResponse) {
  res.json(allowList)
}
