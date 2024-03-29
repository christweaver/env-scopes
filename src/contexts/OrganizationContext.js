import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import convertToSlug from "@/utils/convertToSlug";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState({
    id: null,
    name: "",
  });

  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      const urlPath = location.pathname;
      const urlParts = urlPath.split("/");
      const organizationSlug = urlParts[2];
      const userOrganizations = user.publicMetadata?.organizations;

      console.log({ userOrganizations, organizationSlug });

      //TODO handle situations where the URL doesn't match their organizations. not sure how we wanna handle this
      const currentOrg =
        userOrganizations?.length &&
        userOrganizations.find(
          (x) =>
            convertToSlug(x.organizationName) ===
            convertToSlug(organizationSlug)
        );

      if (!currentOrg) return;
      setSelectedOrganization({
        id: currentOrg.orgId,
        name: currentOrg.organizationName,
      });
    }
  }, [isLoaded, isSignedIn, user]);

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
