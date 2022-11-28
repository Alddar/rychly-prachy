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
import {createContext, SetStateAction, useMemo, useState} from "react";
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

interface StateContextType {
  state: State,
  setState: (state: SetStateAction<State>) => void
  setOffer: (offer: Offer) => void
}

export const StateContext = createContext<StateContextType>({
  state: defaultState as State,
  setState: () => {},
  setOffer: () => {}
});

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<State>(defaultState);

  function setOffer(offer: Offer) {
    setState(state => ({...state, offerList: state.offerList.map(o => o.id === offer.id ? offer : o)}))
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#1976d2"/>
      </Head>
      <CacheProvider value={clientSideEmotioNCache}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StateContext.Provider value={{state, setState, setOffer}}>
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
