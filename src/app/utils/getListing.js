import axios from "axios";

export const getListing = async (tokenId) => {
  console.log({ tokenId });

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": "d68e4884a5124a018a8f088fc47abbff",
    },
  };

  const { data } = await axios.get(
    `https://api.opensea.io//api/v2/orders/base/seaport/listings?asset_contract_address=0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62&order_by=created_date&order_direction=desc&token_ids=${tokenId}`,
    options
  );

  return data?.orders;
};
