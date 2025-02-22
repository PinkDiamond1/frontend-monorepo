# The Vega token website

**_Control panel for your VEGA tokens_**

<img width="1438" alt="Screenshot 2021-12-11 at 06 32 51" src="https://user-images.githubusercontent.com/13255539/145666935-563fc1ff-35bc-4cd9-ae6d-cf711cc23454.png">

## Features

- View vesting progress
- Redeem VEGA tokens
- Stake VEGA tokens
- Withdraw tokens
- Vote on proposals

# Development

Starting the app:

```bash
yarn nx serve token
```

## Configuration

Example configurations are provided here:

- [Mainnet](./.env.mainnet)
- [Devnet](./.env.devnet)
- [Testnet](./.env.testnet)
- [Stagnet3](./.env.stagnet3)

For convenience, you can boot the app injecting one of the configurations above by running:

```bash
yarn nx run token:serve --env={env} # e.g. stagnet3
```

There are a few different configuration options offered for this app:

| **Flag**                            | **Purpose**                                                                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NX_SENTRY_DSN`                     | The sentry endpoint to report to. Should be off in dev but set in live.                                                                              |
| `NX_VEGA_URL`                       | The GraphQL query endpoint of a [Vega data node](https://github.com/vegaprotocol/networks#data-node)                                                 |
| `NX_DEX_STAKING_DISABLED`           | Disable the dex liquidity page an show a coming soon message                                                                                         |
| `NX_FAIRGROUND`                     | Change styling to be themed as the fairground version of the website                                                                                 |
| `NX_INFURA_ID`                      | Infura fallback for if the user does not have a web3 compatible browser                                                                              |
| `NX_ENV`                            | Change network to connect to.                                                                                                                        |
| `NX_ETH_URL_CONNECT` (optional)     | If set to true the below two must also be set. This allows siging transactions in brower to allow to connect to a local ganache node through cypress |
| `NX_ETH_WALLET_MNEMONIC` (optional) | The mnemonic to be used to sign transactions with in browser                                                                                         |
| `NX_LOCAL_PROVIDER_URL` (optional)  | The local node to use to send transaction to when signing in browser                                                                                 |

## Example configs:

For example configurations, check out our [netlify.toml](./netlify.toml).

## Testing

To run the minimal set of unit tests, run the following:

```bash
yarn nx test token
```

To run the UI automation tests with a mocked API, run:

```bash
yarn nx run token-e2e:e2e
```

## See also

- [vega-locked-erc20](https://github.com/vegaprotocol/vega-locked-erc20) - proxy contract that shows your current balance
  of locked tokens
- [VEGA Tokens: Vesting Details](https://blog.vega.xyz/vega-tokens-vesting-details-890b00fc238e) - blog describing
  the vesting process & key dates
- [Introducing the VEGA token](https://blog.vega.xyz/introducing-the-vega-token-40dac090b5c1) - blog about the VEGA
  token
- [The VEGA Token Listing & LP Incentives](https://blog.vega.xyz/unlocking-vega-coinlist-pro-uniswap-sushiswap-b1414750e358) - blog about the token and site
- [vega.xyz](https://vega.xyz) - about Vega Protocol
