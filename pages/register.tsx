import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PageTitle from "../components/PageTitle";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useContext} from "react";
import {StateContext} from "./_app";
import {Address, User} from "../models/app";
import {v4 as uuidv4} from 'uuid';

const ReactCodeInput = dynamic(import("react-code-input"));

export default function Profile() {
  const [error, setError] = React.useState<string | undefined>();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const nextStep = () => setCurrentStep((step) => step + 1);
  const [pinValue, setPinValue] = React.useState<string>("");
  const {push} = useRouter();
  const [ageConfirmation, setAgeConfirmation] = React.useState<boolean>(false);
  const {setState} = useContext(StateContext);
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const passwordRepeat = data.get("passwordRepeat") as string;
    const phoneNumber = data.get("phoneNumber") as string;

    if (
      email.length == 0 ||
      password.length == 0 ||
      passwordRepeat.length == 0 ||
      phoneNumber.length == 0
    ) {
      setError("Je potřeba vyplnit všechna pole.");
      return;
    }

    if (password != passwordRepeat) {
      setError("Hesla se neshodují.");
      return;
    }

    if (ageConfirmation === false) {
      setError("Je potřeba potvrdit, že jste starší 15 let.");
      return;
    }

    setEmail(email);
    setPhone(phoneNumber);
    setPassword(password);
    setError(undefined);
    nextStep();
  };

  const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pinValue.length == 0) {
      setError("Je potřeba vyplnit pole.");
      return;
    }
    if (pinValue != "123456") {
      setError("Zadaný pin neexistuje. (Použijte testovací: 123456)");
      return;
    }

    setError(undefined);
    nextStep();
    setTimeout(() => {
      setState((state) => ({
        ...state,
        user: new User(uuidv4(), email, phone, password, new Address("", "", ""))
      }));
      push("/");
    }, 5000);
  };

  return (
    <Stack>
      <PageTitle>Registrace</PageTitle>
      {currentStep === 0 && (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            name="email"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordRepeat"
            label="Heslo znovu"
            type="password"
            id="passwordRepeat"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Telefonní číslo"
            type="number"
            id="phoneNumber"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+420</InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={ageConfirmation}
                color="primary"
                onChange={(event, value: boolean) => setAgeConfirmation(value)}
              />
            }
            label="Potvrzuji, že jsem starší 15 let"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrovat
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
            Zadejte aktivační kód z SMS
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
        <Stack pt={"1em"} spacing={"1em"}>
          <Alert severity="success">
            Registrace proběhla úspěšně. <br /> Za moment budete přesměrováni...
          </Alert>
        </Stack>
      )}
    </Stack>
  );
}
