import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { getNFTOwner } from "../../utils/getNFTOwners";
import { getAccount } from "../../utils/getAccount";
import { getNFTImageUrl } from "../../utils/getNFTImageUrl";
import { getListing } from "../../utils/getListing";
import { getMeeting } from "../../utils/getMeeting";

import { getCollectionsStats } from "../../utils/getCollectionStats";

import { Redis } from "@upstash/redis";

const NEXT_PUBLIC_URL = "https://78ca-103-59-75-203.ngrok-free.app";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "9269D1DF-9073-4D62-96AD-E8AA03CD9C12",
  });
  let count;

  let user;
  const redis = new Redis({
    url: "https://primary-blowfish-43231.upstash.io",
    token:
      "AajfACQgZWNjMjhkYWUtYTdkMC00MmNjLWFlYjYtOWVkZjMxZGZiOTg3ODllMTE0OGJjMmY0NDYxYThjODUxN2QyOTRmZjZjN2Y=",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    const d: number | null = await redis.get(accountAddress);

    return new NextResponse(
      getFrameHtmlResponse({
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
      })
    );
  }
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Auth Failed`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/failure.png`,
        aspectRatio: "1.91:1",
      },
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
