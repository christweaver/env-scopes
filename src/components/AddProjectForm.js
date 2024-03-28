import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useOrganization } from "@/contexts/OrganizationContext";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function AddProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const { selectedOrganization } = useOrganization();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to new API endpoint
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        projectURL: projectUrl,
        organizationId: selectedOrganization.id,
      }),
    });
    router.replace(`/project/${projectUrl}`);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add new Project
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          name="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          label="Enter Project Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="projectUrl"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          label="Enter Project URL"
          variant="outlined"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ alignSelf: "center" }}
        >
          Create Project
        </Button>
      </Box>
    </Box>
  );
}
