import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = "https://7419-103-59-75-15.ngrok-free.app";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Find Fellow ToshiCat",
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
