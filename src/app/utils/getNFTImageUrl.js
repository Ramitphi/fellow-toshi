import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTImageUrl = async (tokenId) => {
  console.log({ tokenId });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    TokenNft(input: {address: "0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62", tokenId: "${tokenId}", blockchain: base}) {
      contentValue {
        image {
          original
        }
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  console.log({ data });

  return data?.TokenNft?.contentValue?.image?.original;
};
