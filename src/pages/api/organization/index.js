import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";

const prisma = new PrismaClient();

export default async function organization(req, res) {
  switch (req.method) {
    case "POST":
      try {
        //TODO HANDLE UNIQUE CONSTRAINT HERE organizationName should be unique
        const { organizationName, organizationURL, userId } = req.body;
        console.log(userId);
        const item = await prisma.organization.create({
          data: { organizationName, organizationURL },
        });
        console.log(item);

        // TODO ADD ARRAY OF ORGANIZATION INSTEAD OF OBJECT
        await clerkClient.users.updateUserMetadata(userId, {
          publicMetadata: {
            organization: item.id,
          },
        });
        console.log(item);

        return res.status(200).json(item);
      } catch (error) {
        console.error(error);
        throw error;
      }
    case "GET":
      break;
  }
}
