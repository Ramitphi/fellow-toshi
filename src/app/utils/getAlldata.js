import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getAlldata = async () => {
  console.log({ address });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Base: TokenBalances(
      input: {filter: {tokenAddress: {_eq: "0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62"}}, blockchain: base, limit: 200}
    ) {
      TokenBalance {
        owner {
          socials(
            input: {filter: {dappName: {_eq: farcaster}}}
          ) {
            profileName
          }
        }
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              small
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);

  return data.Base.TokenBalance;
};
