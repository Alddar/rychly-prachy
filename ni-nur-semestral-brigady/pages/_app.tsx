import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import theme from "../styles/theme/theme";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@nextcss/reset";
import "../styles/global.css";
import { createContext, useMemo, useState } from "react";

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const clientSideEmotioNCache = createEmotionCache();

type User = {
  name: string;
};

export const GlobalContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({ user: null, setUser: () => {} });
const ThingsProvider = GlobalContext.Provider;

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const initContextState = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user, setUser]);

  return (
    <CacheProvider value={clientSideEmotioNCache}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThingsProvider value={initContextState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThingsProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
