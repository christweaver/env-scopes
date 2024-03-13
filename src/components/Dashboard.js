import { UserButton } from "@clerk/nextjs";
import { OrganizationList } from "@clerk/nextjs";
export default function Dashboard() {
  return (
    <div>
      <UserButton />
      <OrganizationList
        afterSelectOrganizationUrl={(org) => `/organization/${org.slug}`}
        hidePersonal="true"
      />
    </div>
  );
}
