import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import PageTitle from "../components/PageTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StateContext } from "./_app";
import {Address, User} from "../models/app";
const ReactCodeInput = dynamic(import("react-code-input"));

export default function Profile() {
    const [error, setError] = React.useState<string | undefined>();
    const [currentStep, setCurrentStep] = React.useState<number>(0);
    const nextStep = () => setCurrentStep((step) => step + 1);
    const [pinValue, setPinValue] = React.useState<string>("");
    const { push } = useRouter();
    const { state, setState } = useContext(StateContext);
    const [editedUser, setEditedUser] = React.useState<User | null>(null);
    
    useEffect(() => {
        if (!state.user) {
            push("/login");
        }
    }, [state]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.user == null) {
            return
        }

        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const passwordRepeat = data.get("passwordRepeat") as string;
        const phoneNumber = data.get("phoneNumber") as string;
        const street = data.get("street") as string;
        const city = data.get("city") as string;
        const postCode = data.get("postCode") as string;

        if (email.length == 0 || password.length == 0 || passwordRepeat.length == 0 || phoneNumber.length == 0) {
            setError("Je potřeba vyplnit všechna pole.");
            return;
        }

        if (password != passwordRepeat) {
            setError("Hesla se neshodují.")
            return;
        }
        
        setError(undefined);
        setEditedUser(new User(state.user.id, email, password, phoneNumber,new Address(  street, city,  postCode)))
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
        setState((state) => ({ ...state, user: editedUser}));
        setTimeout(() => {
            push("/profile");
        }, 5000);
      };
    

    return (
        <Stack>
            <PageTitle>Profil uživatele</PageTitle>
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
                        defaultValue={state.user?.email}
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
                        startAdornment: <InputAdornment position="start">+420</InputAdornment>,
                        }}
                        defaultValue={state.user?.phone}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="street"
                        label="Ulice a číslo popisné"
                        type="text"
                        name="street"
                        autoFocus
                        defaultValue={state.user?.address.street}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="city"
                        label="Město"
                        type="text"
                        name="city"
                        autoFocus
                        defaultValue={state.user?.address.city}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="postCode"
                        label="PSČ"
                        type="text"
                        name="postCode"
                        autoFocus
                        defaultValue={state.user?.address.postCode}
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
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Uložit změny
                    </Button>
                </Box>
            )}
            {currentStep === 1 && (
                <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 1 }}>
                    <Typography variant={"h5"} textAlign={"center"}>
                        Zadejte potvrzovací kód z SMS
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
                    Změny byly úspěšně uloženy. <br /> Za moment budete přesměrováni...
                    </Alert>
                </Stack>
            )}
        </Stack>
    )
}