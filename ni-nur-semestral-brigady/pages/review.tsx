import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function BasicRating() {
    const [rating, setRatingRating] = React.useState<number | null>(null);
    const [textRating, setTextRating] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextRating(event.target.value);
    };
    
    
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
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                        setRatingRating(newValue);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Volitelný komentář"
                    multiline
                    minRows={5}
                    value={textRating}
                    onChange={handleChange}
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