import WorkCard from "../components/complex/WorkCard";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FilterAltOutlined, Search, Sort } from "@mui/icons-material";
import PageTitle from "../components/PageTitle";
import * as React from "react";
import { Offer } from "../models/offer";
import { DateTime } from "luxon";
import Link from "next/link";

export default function Home() {
  const workList: Offer[] = new Array(10).fill({
    title: "Název práce",
    description: "",
    distance: 0.5,
    location: "Praha",
    requirements: [],
    date: DateTime.local(2022, 5, 12, 8, 30),
    price: 100,
    duration: 3,
  })

  const onSearch = async (term: string) => {
    console.log(term);
  };

  const onFilter = async () => {
    console.log("filter");
  };

  const onSort = async () => {
    console.log("sort");
  };
  return (
    <>
      <PageTitle>Nabídky</PageTitle>
      <Box py={"2em"}>
        <TextField
          id="standard-basic"
          label="Jakou práci hledáte?"
          variant="standard"
          onChange={(e) => onSearch(e.target.value)}
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
      <Stack direction={"row"} justifyContent={"space-between"} pb={"1em"}>
        <FilterAltOutlined onClick={onFilter} />
        <Stack direction={"row"} spacing={"6px"} onClick={onSort}>
          <Typography variant={"body1"}>Řazení</Typography>
          <Sort />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        {workList.map((work, idx) => (
          <Link href="/detail" key={`work-card-${idx}`}>
            <WorkCard offer={work} />
          </Link>
        ))}
      </Stack>
    </>
  );
}
