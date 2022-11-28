import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
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
import { Offer, Provider, User } from "../models/app";
import { offerList, providerList } from "../fixtures/app";
import { ThemeProvider } from "@mui/system";
import Head from "next/head";

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const clientSideEmotioNCache = createEmotionCache();

export interface State {
  user: User | null,
  offerList: Offer[],
  providerList: Provider[]
}

const defaultState =  {
  user: null,
  offerList,
  providerList
}

export const StateContext = createContext({
  state: defaultState as State,
  setState: (modifyState: (state: State) => State) => {}
});

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<State>(defaultState);


  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CacheProvider value={clientSideEmotioNCache}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StateContext.Provider value={{state, setState}}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </StateContext.Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </>
  );
}
