import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getAccount = async (address) => {
  console.log({ address });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Socials(
      input: {filter: {userAssociatedAddresses: {_eq: "${address}"}, dappName: {_eq: farcaster}}, blockchain: ethereum}
    ) {
      Social {
        dappName
        profileName
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);

  return data?.Socials?.Social;
};
