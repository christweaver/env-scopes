import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CustomTable from "@/components/CustomTable";
import { Button } from "@mui/material";
import { UserProfile } from "@clerk/clerk-react";
import styled from "styled-components";
import CustomModal from "@/components/CustomModal";
const availableServices = [
  { name: "Gitlab", key: "oauth_gitlab" },
  { name: "Github", key: "oauth_github" },
];

const columns = [
  { field: "service_name", headerName: "Service" },
  { field: "inner", headerName: "", renderCell: (params) => params.value },
];

const UserProfileWrapper = styled.div`
  .cl-navbar {
    display: none;
  }

  .cl-profilePage.cl-profilePage__security {
    display: none;
  }

  .cl-header,
  .cl-profileSection.cl-profileSection__profile,
  .cl-profileSection__emailAddresses {
    display: none;
  }
`;

export default function Import() {
  const [rows, setTableRows] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const router = useRouter();
  console.log(router.query);
  let { orgID } = router.query;
  let organizationId = orgID;
  console.log(organizationId);

  const tRows = [
    { id: 2, projectName: "DataPipeline", projectURL: "test" },
    { id: 3, projectName: "chisty", projectURL: "test" },
    { id: 4, projectName: "InventoryManager", projectURL: "test" },
    { id: 5, projectName: "PaymentGateway", projectURL: "test" },
    { id: 6, projectName: "CustomerSupportBot", projectURL: "test" },
    { id: 7, projectName: "EmailService", projectURL: "test" },
    { id: 8, projectName: "UserFeedback", projectURL: "test" },
    { id: 9, projectName: "MobileApp", projectURL: "test" },
    { id: 10, projectName: "CloudStorage", projectURL: "test" },
  ];

  const tColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "projectName", headerName: "Project Name", width: 200 },
    { field: "projectURL", headerName: "Project URL", width: 200 },
    ,
  ];

  async function importToDB() {
    // Send a POST request to new API endp
    console.log("Project Name:", projectName);
    console.log("Project URL:", projectURL);

    // Ensure projectName and projectURL are set
    if (!projectName || !projectURL) {
      console.error("Project name or URL is missing");
      return;
    }
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ projectName, projectURL, organizationId }),
    });
    // router.replace(`organization/${organizationURL}`);
    console.log("yay");
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const getdt = async () => {
      const { data: connectedAccts } = await axios("/api/getOauthConnects");
      const isAlreadyConnected = availableServices.map((service) => {
        const isConnected = connectedAccts.includes(service.key);
        return {
          id: service.key,
          service_name: service.name,
          isConnected,
          inner: (
            <Button
              variant="outlined"
              onClick={() => handleButtonClick(service, isConnected)}
            >
              {isConnected ? "IMPORT" : "CONNECT"}
            </Button>
          ),
        };
      });
      console.log(isAlreadyConnected);
      setTableRows(isAlreadyConnected);
    };
    getdt();
  }, []);

  const handleButtonClick = (service, isConnected) => {
    if (isConnected) {
      setModalOpen(true);
    } else {
      setSelectedService(service);
      setShowUserProfile(true);
    }
  };
  function handleRowClick(row) {
    console.log;
    setProjectName(row.projectName);
    setProjectURL(row.projectURL);
  }

  return (
    <>
      {modalOpen && (
        <CustomModal
          open={modalOpen}
          onClose={handleModalClose}
          title="Choose Repositories"
          size="large"
          darkBackground
          disableBackdropClick
        >
          <CustomTable
            rows={tRows}
            columns={tColumns}
            isRowSelectable={true}
            isPaginationEnabled={false}
            showRowsPerPage={false}
            showRowCounter={false}
            clickRowHandler={(e) => setProjectName()}
          />
          <Button onClick={importToDB}>Import</Button>
        </CustomModal>
      )}
      {showUserProfile && (
        <div className="importBtn">
          <UserProfileWrapper>
            <UserProfile />
          </UserProfileWrapper>
          <Button onClick={() => setShowUserProfile(false)}>Close</Button>
        </div>
      )}
      {!showUserProfile && (
        <CustomTable
          rows={rows}
          columns={columns}
          isRowSelectable={false}
          isPaginationEnabled={false}
          showRowsPerPage={false}
          showRowCounter={false}
        />
      )}
    </>
  );
}
