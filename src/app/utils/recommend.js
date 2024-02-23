import { FriendFetcher } from "onchain-friends-sdk";

export const recommendUser = async (address, number) => {
  // Initialize the SDK
  const friendFetcher = new FriendFetcher(process.env.AIRSTACK_API_KEY);

  const resFollower = await friendFetcher.getFarcasterFollower(address);

  return resFollower;
};
