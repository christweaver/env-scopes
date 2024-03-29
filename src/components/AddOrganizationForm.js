import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TextField, Button, Typography } from "@mui/material";
import convertToSlug from "@/utils/convertToSlug";

export default function AddOrganizationForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationSlug, setOrganizationSlug] = useState("");
  let router = useRouter();
  const { isSignedIn, user } = useUser();

  const handleOrganizationNameChange = (e) => {
    const { value } = e.target;
    setOrganizationName(value);
    setOrganizationSlug(convertToSlug(value));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/organization", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        organizationName,
        organizationSlug,
        userId: user.id,
      }),
    });
    //router.replace(`/organization/${organizationSlug}`);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Add new organization
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <TextField
          name="organizationName"
          value={organizationName}
          onChange={handleOrganizationNameChange}
          label="Enter organization Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="organizationSlug"
          value={organizationSlug}
          disabled
          label="Organization Slug"
          variant="outlined"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ alignSelf: "center" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}