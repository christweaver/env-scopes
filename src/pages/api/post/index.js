import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function POST(req, res) {
  if (req.method === "POST") {
    const { organizationName, organizationURL } = req.body;
    const item = await prisma.Organization.create({
      data: { organizationName, organizationURL },
    });
    console.log(item);

    return res.status(200).json(item);
  } else return res.status(400).json({ err });
}

// export default async function POST(req, res) {
//   if (req.method === "POST") {
//     const { projectName, projectURL } = req.body;
//     const item = await prisma.project.create({
//       data: { projectName, projectURL },
//     });
//     console.log(item);

//     return res.status(200).json(item);
//   } else return res.status(400).json({ err });
// }
