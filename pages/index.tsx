import WorkCard from "../components/complex/WorkCard";
import {
  Box,
  Chip,
  Drawer,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { FilterAltOutlined, Search } from "@mui/icons-material";
import PageTitle from "../components/PageTitle";
import * as React from "react";
import { useContext, useState } from "react";
import Link from "next/link";
import { StateContext } from "./_app";
import {
  defaultFilterState,
  Filter,
  FilterState,
} from "../components/complex/Filter";
import diacritics from "diacritics";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { OfferStatus } from "../models/app";

export default function Home() {
  const { state, setState } = useContext(StateContext);
  const [filterState, setFilterState] = useState({
    menuOpen: false,
    search: "",
    sort: "",
    sortDirection: true,
    filters: defaultFilterState,
  });

  const handleFilterChange = (newState: Partial<FilterState>) =>
    setFilterState((state) => ({
      ...state,
      filters: { ...state.filters, ...newState },
    }));

  // @ts-ignore
  return (
    <>
      <Drawer
        anchor="left"
        open={filterState.menuOpen}
        onClose={() =>
          setFilterState((state) => ({ ...state, menuOpen: false }))
        }
      >
        <Filter
          state={filterState.filters}
          setState={handleFilterChange}
          setMenuOpen={(menuOpen) =>
            setFilterState((state) => ({ ...state, menuOpen }))
          }
        ></Filter>
      </Drawer>
      <PageTitle>Nabídky</PageTitle>
      <Box py={"2em"}>
        <TextField
          id="standard-basic"
          label="Jakou práci hledáte?"
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
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <FilterAltOutlined
            sx={{ marginRight: "1rem", marginTop: "0.3rem" }}
            onClick={() =>
                setFilterState((state) => ({ ...state, menuOpen: true }))
            }
        />
            <Stack
                direction={"row"}
                sx={{ marginLeft: "auto" }}
                spacing={"6px"}
                alignItems={"center"}
            >
                <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-label">Řazení</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={filterState.sort}
                        label="Řazení"
                        onChange={(e) =>
                            setFilterState((state) => ({
                                ...state,
                                sort: e.target.value || "",
                            }))
                        }
                    >
                        <MenuItem value="distance">Vzdálenost</MenuItem>
                        <MenuItem value="price">Odměna</MenuItem>
                        <MenuItem value="date">Datum</MenuItem>
                    </Select>
                </FormControl>
                {filterState.sortDirection ? (
                    <ArrowDownwardIcon
                        onClick={() =>
                            setFilterState((state) => ({ ...state, sortDirection: false }))
                        }
                    />
                ) : (
                    <ArrowUpwardIcon
                        onClick={() =>
                            setFilterState((state) => ({ ...state, sortDirection: true }))
                        }
                    />
                )}
            </Stack>
        </Stack>
      <Box display={'flex'} alignItems={'flex-start'} gap={'0.4em'} paddingBottom={'1em'} pt={'0.5em'} flexWrap={'wrap'}>
        {filterState.filters.location ? (
          <Chip
              color={'primary'}
            label={filterState.filters.location}
            onDelete={() => handleFilterChange({ location: null })}
          />
        ) : (
          <></>
        )}
        {filterState.filters.distance != defaultFilterState.distance ? (
          <Chip color={'primary'}
            label={`<${filterState.filters.distance}km`}
            onDelete={() =>
              handleFilterChange({ distance: defaultFilterState.distance })
            }
          />
        ) : (
          <></>
        )}
        {filterState.filters.cash != defaultFilterState.cash ? (
          <Chip color={'primary'}
            label={`>${filterState.filters.cash}kč`}
            onDelete={() =>
              handleFilterChange({ cash: defaultFilterState.cash })
            }
          />
        ) : (
          <></>
        )}
        {filterState.filters.from || filterState.filters.to ? (
          <Chip color={'primary'}
            label={`${filterState.filters.from?.toLocaleString() ?? "∞"} - ${
              filterState.filters.to?.toLocaleString() ?? "∞"
            }`}
            onDelete={() => handleFilterChange({ from: null, to: null })}
          />
        ) : (
          <></>
        )}
      </Box>
      <Stack spacing={2} mb={"2em"}>
        {(filterState.sort
          ? [...state.offerList].sort(
              (a, b) =>
                // @ts-ignore
                (filterState.sortDirection ? 1 : -1) * (a[filterState.sort] > b[filterState.sort] ? 1 : -1)
            )
          : state.offerList
        )
          .filter((offer) => offer.status === OfferStatus.FREE)
          .filter((offer) => {
            const {
              search,
              filters: { location, distance, cash, from, to },
            } = filterState;
            if (
              search &&
              !diacritics
                .remove(offer.title)
                .toLowerCase()
                .includes(diacritics.remove(search).toLowerCase())
            )
              return false;
            if (location && offer.location != location) return false;
            if (distance && offer.distance > distance) return false;
            if (cash && offer.price < cash) return false;
            if (from && offer.date < from) return false;
            if (to && offer.date > to) return false;
            return true;
          })
          .map((offer) => (
            <Link href={`/offer/${offer.id}`} key={`work-card-${offer.id}`}>
              <WorkCard offer={offer} />
            </Link>
          ))}
      </Stack>
    </>
  );
}
