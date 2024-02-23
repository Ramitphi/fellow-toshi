import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const isAttendee = async (address) => {
  console.log({ address });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    SocialFollowers(
      input: {filter: {identity: {_eq: "${address}"}, dappName: {_eq: farcaster}}, blockchain: ALL, limit: 100}
    ) {
      Follower {
        followerAddress {
          tokenBalances(input: {filter: {tokenAddress: {_eq: "0x058d96baa6f9d16853970b333ed993acc0c35add"}}, blockchain: polygon}) {
            owner {
              identity
            }
            tokenAddress
            tokenId
            tokenType
          }
        }
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  return data?.SocialFollowers?.Follower;
};
