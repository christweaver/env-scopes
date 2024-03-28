import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Menu from "../components/Menu";
import Container from "@mui/material/Container";
import { OrganizationProvider } from "@/contexts/OrganizationContext";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <OrganizationProvider>
        <Menu />
        <Container maxWidth="md">
          <Component {...pageProps} />
        </Container>
      </OrganizationProvider>
    </ClerkProvider>
  );
}
