import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { StateContext } from "./_app";
import { useRouter } from "next/router";
import PageTitle from "../components/PageTitle";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const { state, setState } = useContext(StateContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!state.user) {
      push("/login");
    }
  }, [state]);

  return (
    <Stack>
      <PageTitle>Profil</PageTitle>
      <Typography variant={"body1"} mt={"1em"}>
        Přihlášen jako {state.user?.name}.
      </Typography>
    </Stack>
  );
}
