import {
  CircularProgress,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import "styles/styles.css";
import type { AppProps } from "next/app";
import themes from "src/themes";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/utils/createEmotionCache";
import { useUser } from "src/swr-cache/useUser";
import { useRouter } from "next/router";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  const { user, loggedOut, loading } = useUser();
  const router = useRouter();

  // if (pageProps.protected) {
  //   if (loading) {
  //     return (
  //       <Container sx={{ height: "100vh" }}>
  //         <Stack justifyContent="center" alignItems="center" height="100%">
  //           <CircularProgress />
  //         </Stack>
  //       </Container>
  //     );
  //   } else if (loggedOut || (pageProps.role && pageProps.role !== user?.role)) {
  //     router.replace("/");
  //   }
  // }

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
