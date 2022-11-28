import WorkCard from "../components/complex/WorkCard";
import {Box, InputAdornment, Stack, Typography,} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Search} from "@mui/icons-material";
import PageTitle from "../components/PageTitle";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {StateContext} from "./_app";
import diacritics from "diacritics";
import {useRouter} from "next/router";
import {OfferStatus} from "../models/app";
import Button from "@mui/material/Button";

export default function My() {
  const { state } = useContext(StateContext);
  const { push } = useRouter();
  const [filterState, setFilterState] = useState({
    menuOpen: false,
    search: "",
  });

  const myOffers = state.offerList.filter((offer) => offer.interested && offer.interested.id === state.user?.id);
  const myCompletedOffers = myOffers.filter((offer) => offer.status === OfferStatus.COMPLETED);
  const myPendingOffers = myOffers.filter((offer) => offer.interested === state.user && !myCompletedOffers.includes(offer));

  useEffect(() => {
    if (state.user === null) {
      push("/login");
    }
  }, [push, state.user])

  return (
    <>
      <PageTitle>Moje brigády</PageTitle>
      <Box py={"2em"}>
        <TextField
          id="standard-basic"
          label="Filtr mých brigád"
          variant="standard"
          value={filterState.search}
          onChange={(e) =>
            typeof e.target.value !== "undefined" &&
            e.target.value !== null &&
            setFilterState((state) => ({ ...state, search: e.target.value }))
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {!myOffers.length && (
        <Typography variant="h5" align="center">
          Nemáte žádné brigády
        </Typography>
      )}
      <Stack spacing={2}>
        {myPendingOffers
          .filter((offer) => {
            const {
              search
            } = filterState;
            if (
              search &&
              !diacritics
                .remove(offer.title)
                .toLowerCase()
                .includes(diacritics.remove(search).toLowerCase())
            )
              return false;
            return true;
          })
          .map((offer) => (
            <Link href={`/offer/${offer.id}`} key={`work-card-${offer.id}`}>
              <WorkCard offer={offer} />
            </Link>
          ))}
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
            Dokončené brigády
        </Typography>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {myCompletedOffers
              .filter((offer) => {
                const {
                  search
                } = filterState;
                if (
                    search &&
                    !diacritics
                        .remove(offer.title)
                        .toLowerCase()
                        .includes(diacritics.remove(search).toLowerCase())
                )
                  return false;
                return true;
              })
              .map((offer) => (
                  <Box key={`work-card-rating-${offer.id}`}>
                      <Link href={`/offer/${offer.id}`}>
                          <WorkCard offer={offer}/>
                      </Link>
                      {offer.status === OfferStatus.COMPLETED && !offer.rating &&
                          <Link href={`/offer/${offer.id}/rating`} key={`work-card-rating-${offer.id}`}>
                              <Button variant="contained" color="warning" style={{width: "100%"}}>
                                  Ohodnotit
                              </Button>
                          </Link>
                      }
                  </Box>
              ))}
        </Stack>
      </Box>
    </>
  );
}
