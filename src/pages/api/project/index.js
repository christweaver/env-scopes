import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
const prisma = new PrismaClient();

export default async function project(req, res) {
  switch (req.method) {
    case "POST":
      try {
        //TODO FIX bad name organizationOrganizationName - fix in model
        const { projectName, projectURL, organizationId } = req.body;
        const item = await prisma.project.create({
          data: { projectName, projectURL, organizationId },
        });
        console.log(item);
        return res.status(200).json(item);
      } catch (error) {
        throw error;
      }
    case "GET":
      const { userId, org } = await req.query;
      console.log({ userId, org });
      const user = await clerkClient.users.getUser(userId);

      const userOrganizations = user.privateMetadata.organizations;
      const found =
        userOrganizations?.length &&
        userOrganizations.find((x) => x.orgId === org);
      console.log(org);
      if (!found) return res.status(200).json([]);
      const projects = await prisma.project.findMany({
        where: {
          organizationId: org,
        },
      });

      console.log("projects", projects);
      return res.status(200).json(projects);
      break;
  }
}
