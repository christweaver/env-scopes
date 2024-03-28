import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function newProject() {
  const [projectName, setProjectName] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const { user, isLoaded } = useUser();
  let router = useRouter();
  const organizationId = user?.publicMetadata.organization;
  console.log({ user, organizationId });
  let handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("api/project", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ projectName, projectURL, organizationId }),
    });
    router.replace(`organization/${projectURL}`);
  };
  return (
    <>
      <h1>projects</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="project name"
        ></input>
        <input
          value={projectURL}
          onChange={(e) => setProjectURL(e.target.value)}
          placeholder="project url"
        ></input>
        <button type="submit">Add to database</button>
      </form>
    </>
  );
}
