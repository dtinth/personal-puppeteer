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
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtucrzfonc9G+AHu915oO
h4lgwdJ0zMmREh0EZJKBtzlRw9QKW8mCd9GMKVfv4kYOZur9BcDXElzhBsLM09rh
7HXV2Ba7h7v+KC2bDl2aoeILye9pERLAnSnUWzJxBRwN9VGFp7rxAzFrHwvA1U3o
yDsBImg2gQMIOzKWgvvd6HE+pQpxEDz336yzEZDs8186XLeIssbC5jht1lb7s3/0
yoD83zGow/xLirUG/dS/Fzt1O3xK5rBlNrNxRHwv0t36HCRhhPihG62vV7VwnXnI
43QyQmtHc0m0LNlo6kvGT+jVzPvMjlHHSFYBVzXz7uLqiC6OpYr9R/UkNkaQzAJw
1wIDAQAB
-----END PUBLIC KEY-----`,
  },
}

type AllowListItem = {
  publicKey: string
}

export default async function (req: NowRequest, res: NowResponse) {
  res.json(allowList)
}
