import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Image from "next/image";
import logo from "../public/img/logo.png";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./_app";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link
        color="inherit"
        href="https://nejrychlejšíprachy.cz/"
        target={"_blank"}
      >
        NejrychlejšíPrachy.cz
      </Link>{" "}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { push } = useRouter();
  const [error, setError] = React.useState<string | undefined>();
  const { user, setUser } = useContext(GlobalContext);

  useEffect(() => {
    if (user) {
      push("/");
    }
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (email.length == 0 || password.length == 0) {
      setError("Je potřeba vyplnit obě pole.");
      return;
    }

    if (email != "admin" && password != "admin") {
      setError(
        "Zadali jste špatné přihlašovací údaje. (Použijte testovací: admin/admin)"
      );
      return;
    }

    setUser({ name: "admin" });
    push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={logo} alt={"Logo"} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Heslo"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Přihlásit se
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset-password" variant="body2" noWrap>
                Zapomněli jste heslo?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Nemáte účet? Zaregistrujte se.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 6, mb: 4 }} />
    </Container>
  );
}
