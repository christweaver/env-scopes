// src/pages/api/gitlab.js
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import axios from "axios";

const GITLAB_API_URL = "https://gitlab.com/api/v4";
const GITLAB_PROVIDER = "oauth_gitlab";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await clerkClient.users.getUser(userId);
    
    if(user){
      //This gives us the info about what Oauth accounts they have set up (gitlab, github, etc)
      const externalAccounts = user.externalAccounts && user.externalAccounts.map(a=> a.provider);
    }

    const [clerkResponse] = await clerkClient.users.getUserOauthAccessToken(
      userId,
      GITLAB_PROVIDER
    );

    if (!clerkResponse) {
      res.status(500).json({ error: "Failed to retrieve OAuth access token" });
      return;
    }

    const { data: gitlabProjects } = await axios.get(
      `${GITLAB_API_URL}/projects`,
      {
        params: {
          membership: true,
        },
        headers: {
          Authorization: `Bearer ${clerkResponse.token}`,
        },
      }
    );

    res.status(200).json(gitlabProjects);
  } catch (error) {
    console.error("Error fetching Gitlab projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}