import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import PageTitle from "../components/PageTitle";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ReactCodeInput = dynamic(import("react-code-input"));

export default function Profile() {
  const [error, setError] = React.useState<string | undefined>();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const nextStep = () => setCurrentStep((step) => step + 1);
  const [pinValue, setPinValue] = React.useState<string>("");
  const { push } = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    if (email.length == 0) {
      setError("Je potřeba vyplnit pole.");
      return;
    }
    if (email != "admin") {
      setError("Zazadaný účet neexistuje. (Použijte testovací: admin)");
      return;
    }
    setError(undefined);
    nextStep();
  };

  const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submit", pinValue);
    if (pinValue.length == 0) {
      setError("Je potřeba vyplnit pole.");
      return;
    }
    if (pinValue != "123456") {
      setError("Zazadaný pin neexistuje. (Použijte testovací: 123456)");
      return;
    }

    setError(undefined);
    nextStep();
  };

  const handleSubmit3 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;
    const passwordRepeat = data.get("passwordRepeat") as string;
    if (password.length == 0 || passwordRepeat.length == 0) {
      setError("Je potřeba vyplnit obě pole.");
      return;
    }

    if (password != passwordRepeat) {
      setError("Hesla se neshodují.");
      return;
    }
    setError(undefined);
    nextStep();
    setTimeout(() => {
      push("/");
    }, 5000);
  };

  return (
    <Stack>
      <PageTitle>Zapomněl jsem heslo</PageTitle>
      {currentStep === 0 && (
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
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Odeslat
          </Button>
        </Box>
      )}
      {currentStep === 1 && (
        <Box
          component="form"
          onSubmit={handleSubmit2}
          noValidate
          sx={{ mt: 1, pt: 8 }}
        >
          <Typography variant={"h5"} textAlign={"center"}>
            Zadejte obnovovací kod
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }} py={"1em"}>
            <ReactCodeInput
              type={"number"}
              fields={6}
              name={"pin"}
              inputMode={"numeric"}
              onChange={(value) => setPinValue(value)}
            />
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Potvrdit
          </Button>
        </Box>
      )}
      {currentStep === 2 && (
        <Box
          component="form"
          onSubmit={handleSubmit3}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            type={"password"}
            id="password"
            label="Heslo"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type={"password"}
            id="passwordRepeat"
            label="Heslo znovu"
            name="passwordRepeat"
            autoFocus
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Odeslat
          </Button>
        </Box>
      )}
      {currentStep === 3 && (
        <Stack pt={"1em"} spacing={"1em"}>
          <Alert severity="success">
            Heslo bylo úspěšně změněno. <br /> Za moment budete přesměrování...
          </Alert>
        </Stack>
      )}
    </Stack>
  );
}
