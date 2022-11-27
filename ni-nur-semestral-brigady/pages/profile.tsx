import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./_app";
import { useRouter } from "next/router";
import PageTitle from "../components/PageTitle";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const { user, setUser } = useContext(GlobalContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push("/login");
    }
  }, [user]);

  return (
    <Stack>
      <PageTitle>Profil</PageTitle>
      <Typography variant={"body1"} mt={"1em"}>
        Přihlášen jako {user?.name}.
      </Typography>
    </Stack>
  );
}
