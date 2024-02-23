import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getAccount = async (address) => {
  console.log({ address });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Socials(
      input: {filter: {userAssociatedAddresses: {_eq: "${address}"}}, blockchain: ethereum}
    ) {
      Social {
        dappName
        profileName
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        userAddress
        userAssociatedAddresses
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);

  console.log({ acc: data });
  return data?.Socials?.Social;
};
