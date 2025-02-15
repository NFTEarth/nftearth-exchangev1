import { paths } from '@nftearth/reservoir-sdk'

type TokenSale = NonNullable<
  paths['/sales/v4']['get']['responses']['200']['schema']['sales']
>[0]

type Collection = NonNullable<
  paths['/collections/v5']['get']['responses']['200']['schema']['collections']
>[0]

type TokenDetails = NonNullable<
  NonNullable<
    paths['/tokens/v5']['get']['responses']['200']['schema']['tokens']
  >[0]['token']
>

type FeeType = {
  kind?: string | undefined;
  recipient?: string | undefined;
  bps?: number | undefined;
}

type TokenDetailsAttribute = NonNullable<TokenDetails['attributes']>[0]
