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
  'screenshot-redirector': {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuQgPix+cRdWGGfHDumA2
uFfYMhlv2U0Jxc5ww+vIHeDddocxMOXRhjnWkjZ0z6E6Otq8FRgMKXCRFusoXx81
nmrXrVwschDGf1ypwtaEN0ee5TQ9BCE68Maw8Haafjbwxw7najWiRk9q3VLQVcwC
Mau0Zi16q/trasqgjXh5AAKUDO+7vsG1FI4yoNHrcVj+zvuLCPy/dcyJp18HpgoR
bqMiXzkJJRd4vO7yfkW6NBIaudC+nRxui9isQrTAE9oFum5id01g4rvdEqjdFnYJ
cZbPdanG0q/KbIQn+yddgujGNrrRmGNO14l+6eSMri+pqR+C3JSRU0VOPbguA+hw
CwIDAQAB
-----END PUBLIC KEY-----`,
  },
  automatron: {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA44Ry2SLyTOmnd8lhXRal
NirZiXgDqZf0xy3V23HpO4tnGYO+OaFCz46BQMGKoEhNT3Hp0f3857xufDTMHL6l
niZbLZUVHOANV53zfyqt/s1GR+JnUkF+yJ4spNvhRWQVw/Uuwr28/D7VT34FB7Pz
GMZDyKFziwZAEpiZM95kPzU1BBvKuXsRqzVw51BCsOin7rHSjczK4bpBgWxEbtIM
G4Op7vvNF1fQ6Ww9NTCwQosRfub121XZUBnCEN/7fSIC2Ypz1zWpkCPBL3Ly6mIT
uX1urElaiBAigqy19aYg5balOFyl3/aw0vUsxG9caetpVp1eKYfVRk8eOPFJ69AS
KwIDAQAB
-----END PUBLIC KEY-----`,
  },
  'wonderful.software': {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3r3dehkLMOggLWshm6NS
g2Ct1gtPsi618BaBwPa459xcCvDM9e0wiGujM1kkvyLtEligkoqnOoYZL2YdHfK5
aR9hBu/3C/uIqa6LMPLP2FO4sOiGaBIIKvxGWvkZ9CzNN/dcBgqSAoMU4UfNd/vH
NHqJaQ+euTVLPe5JwMtSJqxemREu1wuhAhGI3V8tb0JmYthcvLzpvxeJg1Hwyd1g
BpU1AatXp1OivGXdHQF4vP69Szn775ZofQzqlXaboCDjJ1Zu9wuvxCzJlplml7C3
NAFPAKjVtw86bZyH8rMK/mfmh+5VK5gY/QC55ZqV+iA2VazAm/PYb5k9/h3SR27D
FwIDAQAB
-----END PUBLIC KEY-----`,
  },
}

type AllowListItem = {
  publicKey: string
}

export default async function (req: NowRequest, res: NowResponse) {
  res.json(allowList)
}
