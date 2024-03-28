import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { UserButton } from "@clerk/nextjs";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import CustomModal from "./CustomModal";
import AddOrganizationForm from "./AddOrganizationForm";
import { useOrganization } from "@/contexts/OrganizationContext";
import convertToSlug from "@/utils/convertToSlug";
const pages = ["Repos", "Members"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const { selectedOrganization, setSelectedOrganizationData } =
    useOrganization();

  useEffect(() => {
    if (!user) return;
    if (!user.publicMetadata?.organizations) {
      setShowNewModal(true);
      return;
    }

    setOrganizations(user.publicMetadata.organizations);
    setSelectedOrganizationData(
      user.publicMetadata.organizations[0].orgId,
      user.publicMetadata.organizations[0].organizationName
    );
  }, [user]);

  const handleChange = (event) => {
    const selectedOrganizationId = event.target.value;
    if (selectedOrganizationId === "new") {
      setShowNewModal(true);
      return;
    }

    // Find the organization with the selected ID
    const selectedOrganization = organizations.find(
      (org) => org.orgId === selectedOrganizationId
    );

    // Update the selected organization using the context
    setSelectedOrganizationData(
      selectedOrganizationId,
      selectedOrganization.organizationName
    );

    // Navigate to the selected organization's URL
    router.push(
      `/organization/${convertToSlug(selectedOrganization.organizationName)}`
    );
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleModalClose = () => {
    setShowNewModal(false);
  };

  return (
    <>
      {showNewModal && (
        <CustomModal
          open={showNewModal}
          onClose={handleModalClose}
          title=""
          size="large"
          darkBackground
          disableBackdropClick
        >
          <AddOrganizationForm />
        </CustomModal>
      )}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOrganization.id}
                  label="Age"
                  onChange={handleChange}
                >
                  {organizations.map((org) => {
                    return (
                      <MenuItem key={org.orgId} value={org.orgId}>
                        {org.organizationName}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value={"new"}>Add New</MenuItem>
                </Select>
              </FormControl>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <UserButton />
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
