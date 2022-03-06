import { CssBaseline, ThemeProvider } from "@mui/material";
import "styles/styles.css";
import type { AppProps } from "next/app";
import themes from "src/themes";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/utils/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
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
