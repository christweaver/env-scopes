import { useState, useEffect } from "react";
import axios from "axios";
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

  return (
    <>
        {modalOpen && <CustomModal
        open={modalOpen}
        onClose={handleModalClose}
        title="Import"
        size="large"
        darkBackground
        disableBackdropClick
      >
        <p>This is the content of the modal.</p>
      </CustomModal>}
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
