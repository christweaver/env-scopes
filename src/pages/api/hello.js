// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from "@clerk/nextjs/server";
import {clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export default async function handler(req, res) {
  const { userId } = getAuth(req);

  const provider = "oauth_gitlab";
  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );
  console.log({clerkResponse})
  res.status(200).json({ name: "John Doe" });
}
