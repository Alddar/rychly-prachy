import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

interface JobRating {
    starRating?: number
    textRating?: string
}

export default function BasicRating() {
    const [state, setState] = React.useState<JobRating>({});

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '60vh'}}
        >

            <Grid item xs={12}>
                <h2>Ohodnotit splněnou práci</h2>
            </Grid>
            <Grid item xs={12}>
                <Typography component="legend"></Typography>
                <Rating
                    name="simple-controlled"
                    value={state?.starRating || null}
                    size="large"
                    onChange={(event, newValue) => {
                        setState((state) => ({...state, starRating: newValue!}));
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Volitelný komentář"
                    multiline
                    minRows={5}
                    maxRows={20}
                    value={state?.textRating || ""}
                    onChange={(event) => {
                        setState((state) => ({...state, textRating: event.target.value!}));
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained">
                    Odeslat hodnocení
                </Button>
            </Grid>
        </Grid>
    );
}