import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTImageUrl = async (tokenId) => {
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    TokenNfts(
      input: {filter: {address: {_eq: "0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62"}, tokenId: {_eq: "${tokenId}"}}, blockchain: base}
    ) {
   
      TokenNft {
        contentValue {
          image {
            small
          }
        }
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  console.log({ data, error });

  return data?.TokenNfts?.TokenNft[0].contentValue?.image?.small;
};
