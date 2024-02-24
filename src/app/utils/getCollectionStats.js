import axios from "axios";

export const getCollectionsStats = async (tokenId) => {
  console.log({ tokenId });

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": "d68e4884a5124a018a8f088fc47abbff",
    },
  };

  const { data } = await axios.get(
    "https://api.opensea.io/api/v2/collections/nftoshis-official/stats",
    options
  );

  return {
    floor_price: data?.total?.floor_price,
    average_price: data?.total?.average_price,
  };
};
