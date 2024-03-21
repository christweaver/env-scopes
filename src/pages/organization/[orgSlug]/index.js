import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import { useState, useEffect} from "react";
import CustomTable from "@/components/CustomTable";
import { Typography, Button, } from "@mui/material";
import axios from "axios";
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

  const handleSelectionModelChange = (newSelectionModel) => {
    location.href += `/${newSelectionModel.id}`;
  };

  //TODO MOVE MEMBERS TO MENU BAR

  const CreateSection = (user) => {

   
  const userType = user && user.organizationMemberships[0].role

  const userId = user && user.id
  console.log(userId)
    const router = useRouter();
    useEffect(() => {
      const getdt = async () => {
        //TODO FILTER BY ORGANIZATION
        const gitlabData = await axios(`/api/project?userId=${userId}`);

        const repoFormatted = gitlabData.data.map((x) => {
          return { id: x.id, projectName: x.projectName };
        });
        console.log(repoFormatted);
        setRepoData(repoFormatted);
      };
      user&& getdt();
    }, [user]);


    const handleButtonClick = () => {
     
      router.push(`${router.asPath}/import`);
    };

    if (!isSignedIn || !user) {
      return <div>Loading...</div>; // or any other loading state
    }
    
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
        
          <Button variant="contained" onClick={handleButtonClick}>
            Import Projects
          </Button>
        
      </div>
    );
  };

  return CreateSection(isSignedIn && user);
}