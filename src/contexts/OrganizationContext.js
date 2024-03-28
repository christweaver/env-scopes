import React, { createContext, useState, useContext } from "react";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState({
    id: null,
    name: "",
  });

  const setSelectedOrganizationData = (id, name) => {
    setSelectedOrganization({ id, name });
  };

  return (
    <OrganizationContext.Provider
      value={{ selectedOrganization, setSelectedOrganizationData }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);
