import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Menu from "../components/Menu";
import Container from "@mui/material/Container";
export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Menu />
      <Container maxWidth="md">
        <Component {...pageProps} />
      </Container>
    </ClerkProvider>
  );
}
