import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);
    console.log(userId);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await clerkClient.users.getUser(userId);

    //This gives us the info about what Oauth accounts they have set up (gitlab, github, etc)
    const externalAccounts =
      user.externalAccounts && user.externalAccounts.map((a) => a.provider);

    res.status(200).json(externalAccounts);
  } catch (error) {
    console.error("Error fetching Gitlab projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
