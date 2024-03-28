import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import CustomTable from "@/components/CustomTable";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useOrganization } from "@/contexts/OrganizationContext";
export default function slug() {
  const rows = [
    { id: 1, projectName: "AuthSystem" },
    { id: 2, projectName: "DataPipeline" },
    { id: 3, projectName: "WebAnalytics" },
    { id: 4, projectName: "InventoryManager" },
    { id: 5, projectName: "PaymentGateway" },
    { id: 6, projectName: "CustomerSupportBot" },
    { id: 7, projectName: "EmailService" },
    { id: 8, projectName: "UserFeedback" },
    { id: 9, projectName: "MobileApp" },
    { id: 10, projectName: "CloudStorage" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "projectName", headerName: "Project Name", width: 200 },
  ];
  const { isSignedIn, user } = useUser();

  const [showMembers, setShowMembers] = useState(false);
  const [repoData, setRepoData] = useState(false);
<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js
  const { selectedOrganization, setSelectedOrganizationData } =
    useOrganization();
=======
  const [orgID, setOrgID] = useState("");
>>>>>>> origin:src/pages/organization/[orgID]/index.js

  const handleSelectionModelChange = (newSelectionModel) => {
    location.href += `/${newSelectionModel.id}`;
  };

  //TODO MOVE MEMBERS TO MENU BAR

  const CreateSection = (user) => {
    const userType = user && user.organizationMemberships[0].role;

    const userId = user && user.id;
<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js
    console.log(userId);
=======
    console.log(user);
>>>>>>> origin:src/pages/organization/[orgID]/index.js
    const router = useRouter();
    useEffect(() => {
      const getdt = async () => {
        //TODO FILTER BY ORGANIZATION
<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js
        console.log(selectedOrganization);
        const projectData =
          selectedOrganization.id &&
          (await axios(
            `/api/project?userId=${userId}&org=${selectedOrganization.id}`
          ));

        const projectsArr = projectData?.data || [];

        const repoFormatted =
          projectsArr.length &&
          projectsArr.map((x) => {
            return { id: x.id, projectName: x.projectName };
          });
=======

        const gitlabData = await axios(`/api/project?userId=${userId}`);
        console.log(gitlabData);
        const repoFormatted = gitlabData.data.map((x) => {
          return { id: x.id, projectName: x.projectName };
        });
>>>>>>> origin:src/pages/organization/[orgID]/index.js
        console.log(repoFormatted);
        setRepoData(repoFormatted);
        setOrgID(gitlabData.data[0].organizationId);
      };
      user && getdt();
<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js
    }, [user, selectedOrganization]);

    const handleButtonClick = () => {
      router.push(`${router.asPath}/import`);
=======
    }, [user]);

    const handleButtonClick = () => {
      router.push(`${orgID}/import`);
>>>>>>> origin:src/pages/organization/[orgID]/index.js
    };

    if (!isSignedIn || !user) {
      return <div>Loading...</div>; // or any other loading state
    }
<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js

=======
    console.log(orgID);
>>>>>>> origin:src/pages/organization/[orgID]/index.js
    return (
      <div>
        {userType === "org:admin" && (
          <>
            {/*  <button onClick={handleViewMembersClick}>View Members</button> */}

            <Typography variant="h3">Repositories</Typography>
            <CustomTable
              rows={repoData}
              columns={columns}
              isRowSelectable={false}
              clickRowHandler={handleSelectionModelChange}
            />
          </>
        )}

<<<<<<< HEAD:src/pages/organization/[orgSlug]/index.js
        <Button variant="contained" onClick={handleButtonClick}>
=======
        <Button
          variant="contained"
          className="bg-blue-500"
          onClick={handleButtonClick}
        >
>>>>>>> origin:src/pages/organization/[orgID]/index.js
          Import Projects
        </Button>
      </div>
    );
  };

  return CreateSection(isSignedIn && user);
}
