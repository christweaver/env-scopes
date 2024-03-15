import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import CustomTable from "@/components/CustomTable";
import { Typography } from "@mui/material";
import axios from 'axios';
export default function slug() {

  const rows = [
    { "id": 1, "projectName": "AuthSystem" },
    { "id": 2, "projectName": "DataPipeline" },
    { "id": 3, "projectName": "WebAnalytics" },
    { "id": 4, "projectName": "InventoryManager" },
    { "id": 5, "projectName": "PaymentGateway" },
    { "id": 6, "projectName": "CustomerSupportBot" },
    { "id": 7, "projectName": "EmailService" },
    { "id": 8, "projectName": "UserFeedback" },
    { "id": 9, "projectName": "MobileApp" },
    { "id": 10, "projectName": "CloudStorage" }
  ]

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'projectName', headerName: 'Project Name', width: 200 }
  ];
  const { isSignedIn, user } = useUser();

  const [showMembers, setShowMembers] = useState(false);
  const [repoData, setRepoData] = useState(false);

  const handleSelectionModelChange = (newSelectionModel) => {
  
    location.href += `/${newSelectionModel.id}`
      
  };



  //TODO MOVE MEMBERS TO MENU BAR

  const CreateSection = (userType) => {
    useEffect(()=>{
    
      const getdt = async ()=>{
        const gitlabData = await axios('/api/hello')
       
        const repoFormatted = gitlabData.data.map(x=>{
          return {id: x.id, projectName: x.name}
        })
        console.log(repoFormatted)
        setRepoData(repoFormatted)
      }
      getdt()
      
    },[])

    return (
      <div>
        <h1>You are signed in as an {userType}</h1>
        {userType === "org:admin"  && (
          <>
            
           {/*  <button onClick={handleViewMembersClick}>View Members</button> */}
         
          <Typography variant="h3">Repositories</Typography>
          <CustomTable rows={repoData} columns = {columns} clickRowHandler={handleSelectionModelChange} />
          </>
        )}

      </div>
    );
  };



  return CreateSection(isSignedIn && user.organizationMemberships[0].role)

  /* if (isSignedIn && user.organizationMemberships[0].role === "org:admin") {
    return (
      <div>
        <h1>You are signed in as an admin</h1>
        <button onClick={handleViewMembersClick}>View Members</button>
        {showMembers && <OrganizationProfile />}
        <OrganizationSwitcher
          afterSelectOrganizationUrl={(org) => `/organization/${org.slug}`}
          hidePersonal="true"
        />
        <UserButton />
        <h2>Display scopes here</h2>
      </div>
    );
  } else {
    return (
      <div className="ml-56">
        <h1 className="ml-56">You are signed in as a member</h1>
        <OrganizationSwitcher
          afterSelectOrganizationUrl={(org) => `/organization/${org.slug}`}
          hidePersonal="true"
        />

        <h2>Display scopes here</h2>
      </div>
    );
  } */
}
