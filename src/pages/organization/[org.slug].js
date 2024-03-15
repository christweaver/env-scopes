import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function slug() {
  const { isSignedIn, user } = useUser();
  console.log(user)
  const [showMembers, setShowMembers] = useState(false);

  const handleViewMembersClick = () => {
    setShowMembers(!showMembers);
  };
  if (isSignedIn && user.organizationMemberships[0].role === "org:admin") {
    return (
      <div>
        <h1>You are signed in as an admin</h1>
        <button onClick={handleViewMembersClick}>View Members</button>
        {showMembers && <OrganizationProfile />}
        <OrganizationSwitcher
          afterSelectOrganizationUrl={(org) => `/organization/${org.slug}`}
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
        />
        <UserButton />

        <h2>Display scopes here</h2>
      </div>
    );
  }
}
