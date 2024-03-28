import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import CustomTable from "@/components/CustomTable";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useOrganization } from "@/contexts/OrganizationContext";
import CustomModal from "@/components/CustomModal";
import AddProjectForm from "@/components/AddProjectForm";
import convertToSlug from "@/utils/convertToSlug";
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
  const { selectedOrganization, setSelectedOrganizationData } =
    useOrganization();
  const [showAddProjectModel, setShowAddProjectModel] = useState(false);

  const handleSelectionModelChange = (newSelectionModel) => {
    console.log({ newSelectionModel });

    location.href += `/${convertToSlug(newSelectionModel.row.projectName)}`;
  };

  //TODO MOVE MEMBERS TO MENU BAR

  const CreateSection = (user) => {
    const userType = user && user.organizationMemberships[0].role;

    const userId = user && user.id;

    const router = useRouter();
    useEffect(() => {
      const getdt = async () => {
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
        console.log(repoFormatted);
        setRepoData(repoFormatted);
      };
      user && getdt();
    }, [user, selectedOrganization]);

    const handleButtonClick = () => {
      router.push(`${router.asPath}/import`);
    };

    const handleAddNewProject = () => {
      setShowAddProjectModel(true);
    };

    if (!isSignedIn || !user) {
      return <div>Loading...</div>;
    }
    return (
      <>
        {/*  <button onClick={handleViewMembersClick}>View Members</button> */}
        {showAddProjectModel && (
          <CustomModal
            open={showAddProjectModel}
            onClose={() => {
              setShowAddProjectModel(false);
            }}
            title=""
            size="large"
            darkBackground
            disableBackdropClick
          >
            <AddProjectForm />
          </CustomModal>
        )}
        <Typography variant="h3">Repositories</Typography>
        <CustomTable
          rows={repoData}
          columns={columns}
          isRowSelectable={false}
          clickRowHandler={handleSelectionModelChange}
        />

        <Button
          variant="contained"
          className="bg-blue-500"
          onClick={handleAddNewProject}
        >
          Add New Project
        </Button>
        <Button
          sx={{ "margin-left": 2 }}
          variant="contained"
          className="bg-blue-500"
          onClick={handleButtonClick}
        >
          Import Projects
        </Button>
      </>
    );
  };

  return CreateSection(isSignedIn && user);
}
