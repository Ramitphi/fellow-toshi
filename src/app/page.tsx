import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = "https://78ca-103-59-75-203.ngrok-free.app";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Website",
      action: "link",
      target: "https://www.toshithecat.com/",
    },
    {
      label: "Twitter",
      action: "link",
      target: "https://twitter.com/Toshi_base",
    },
    {
      label: "Opensea",
      action: "link",
      target: "https://opensea.io/collection/nftoshis-official",
    },
    {
      label: "Basescan",
      action: "link",
      target:
        "https://basescan.org/token/0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
    },
  ],
  image: `${NEXT_PUBLIC_URL}/toshi.png`,

  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "ramit.xyz",
  description: "LFG",
  openGraph: {
    title: "ramit",
    description: "LFG",
    images: [`${NEXT_PUBLIC_URL}/success.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return <>gggg</>;
}
