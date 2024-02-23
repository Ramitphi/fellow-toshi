// import { mnemonicToAccount } from "viem/accounts";

/*** EIP-712 helper code ***/

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator",
  version: "1",
  chainId: 10,
  verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
};

const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
];

// const publicKey =
//   "0x4d9d8771f5e436449344fe612a3229f25d164ef31d87a33ca1d8195200093621"; // Create and fetch this using the Neynar APIs

/*** Generating a Signed Key Request signature ***/

const appFid = "244416"; // Your app's fid
// const account = mnemonicToAccount(
//   "two current legal wise happy enjoy release april gentle trend equip end trash pioneer saddle lounge brick actress vocal long library figure awful come"
// ); // Your app's mnemonic

const deadline = Math.floor(Date.now() / 1000) + 86400; // signature is valid for 1 day

export const getSignature = async () => {
  const signature = await account.signTypedData({
    domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
    types: {
      SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
    },
    primaryType: "SignedKeyRequest",
    message: {
      requestFid: BigInt(appFid),
      key: publicKey,
      deadline: BigInt(deadline),
    },
  });
  return signature;
};
