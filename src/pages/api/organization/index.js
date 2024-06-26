import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";

const prisma = new PrismaClient();

export default async function organization(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { organizationName, organizationSlug, userId } = req.body;
        console.log(userId);
        const item = await prisma.organization.create({
          data: { organizationName, organizationSlug },
        });

        const user = await clerkClient.users.getUser(userId);
        const publicMd = user.publicMetadata?.organizations
          ? user.publicMetadata.organizations
          : [];
        const privateMd = user.privateMetadata?.organizations
          ? user.privateMetadata.organizations
          : [];

        // Add new organization
        publicMd.push({ organizationName, orgId: item.id });
        privateMd.push({ organizationName, orgId: item.id });

        // Update user metadata with the new organization arrays
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: { organizations: privateMd },
          publicMetadata: { organizations: publicMd },
        });

        return res.status(200).json(item);
      } catch (error) {
        console.error(error);
        throw error;
      }
    case "GET":
      break;
  }
}
