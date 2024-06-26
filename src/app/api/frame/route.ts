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

const NEXT_PUBLIC_URL = "https://fellow-toshi.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "9269D1DF-9073-4D62-96AD-E8AA03CD9C12",
  });
  console.log({ message, isValid });

  let count;

  let user;
  const redis = new Redis({
    url: "https://primary-blowfish-43231.upstash.io",
    token:
      "AajfACQgZWNjMjhkYWUtYTdkMC00MmNjLWFlYjYtOWVkZjMxZGZiOTg3ODllMTE0OGJjMmY0NDYxYThjODUxN2QyOTRmZjZjN2Y=",
  });

  console.log({ message, isValid });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    const d: number | null = await redis.get(accountAddress);
    console.log({ d });

    const res = await getNFTOwner(accountAddress);
    // console.log(res);

    let tokenId;
    let uAddress;
    let metadata;
    let meetingLink;
    let listingPrice;
    if (d) {
      count = d;
    } else {
      count = 0;
    }
    let showuser;

    for (let i = Math.floor(count) + 1; i < 200; i++) {
      console.log(i);

      uAddress = res[i]?.owner?.identity;
      tokenId = res[i]?.tokenId;

      // user = await getAccount(uAddress);
      // console.log({ user });

      metadata = await getNFTImageUrl(tokenId);

      // if (user) {
      //   showuser = user[0]?.profileName;

      //   const it = Math.random() * 190;
      //   await redis.set(accountAddress, it);
      //   break;
      // }
      if (metadata) {
        console.log(i);
        const it = Math.random() * 190;
        await redis.set(accountAddress, it);
        break;
      }
    }
    let price;
    const resListing = await getListing(tokenId);
    if (resListing[0]?.current_price) {
      price = resListing[0]?.current_price / Math.pow(10, 18);
    }
    console.log({ price });

    const openseaLabel = resListing[0] ? `Buy ${price} ETH` : `Bid on Opensea`;

    const { floor_price, average_price } = await getCollectionsStats();

    console.log({ metadata, openseaLabel, floor_price, average_price });

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Next",
          },
          {
            action: "link",
            label: `${openseaLabel}`,
            target: `https://opensea.io/assets/base/0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62/${tokenId}`,
          },
          { label: `Floor: ${floor_price}` },
          { label: `Avg: ${average_price}` },
        ],
        image: `${metadata}`,
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
