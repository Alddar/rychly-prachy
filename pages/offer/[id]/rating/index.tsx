import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {useContext, useState} from "react";
import WorkCard from "../../../../components/complex/WorkCard";
import {getOffer} from "../../../../fixtures/app";
import {StateContext} from "../../../_app";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {RatingIcon, ratingIcons} from "./ratingIcon";
import Link from "next/link";
import * as React from "react";

export default function OfferRating() {
    const {state, setOffer} = useContext(StateContext)
    const router = useRouter()
    const {id} = router.query
    const offer = getOffer(state.offerList, Number(`${id}`));

    const [value, setValue] = useState<number | null>(null);
    const [hover, setHover] = useState(-1);
    const selectedIndex = hover !== -1 ? hover : value

    function handleRate() {
        if (value == null) {
            return
        }
        offer.rating = value
        setOffer(offer)
    }

    if (offer.rating != undefined) {
        return <Container maxWidth="sm" sx={{paddingBottom: "2rem"}}>
            <Stack spacing={3} sx={{alignItems: "center"}}>
                <WorkCard offer={offer}></WorkCard>
                <Typography variant="h5">Tato nabídka byla ohodnocena s hodnocením:</Typography>
                <RatingIcon rating={offer.rating}/>
                <Typography
                    sx={{mt: 2, fontWeight: "bold", fontSize: "1.5rem"}}>
                    {ratingIcons[offer.rating].label}
                </Typography>
                <Link href={`/my`}>
                    <Button variant="contained">
                        Hotovo
                    </Button>
                </Link>
            </Stack>
        </Container>
    }

    return (
        <Container maxWidth="sm" sx={{paddingBottom: "2rem"}}>
            <Stack spacing={3}>
                <WorkCard offer={offer}></WorkCard>
                <Typography variant="h5">Hodnocení</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'center'
                        }}
                    >
                        {Object.keys(ratingIcons).map(it => {
                            const index = Number(it)
                            return (
                                <IconButton
                                    key={it}
                                    size="large"
                                    onClick={() => {
                                        setValue(index);
                                    }}
                                    onMouseEnter={() => {
                                        setHover(index)
                                    }}
                                    onMouseLeave={() => {
                                        setHover(-1)
                                    }}
                                >
                                    <RatingIcon rating={index} selected={index === selectedIndex}/>
                                </IconButton>
                            )
                        })}
                    </Box>
                    {selectedIndex !== null && (
                        <Typography
                            sx={{mt: 2, fontWeight: "bold", fontSize: "1.5rem"}}>
                            {ratingIcons[selectedIndex].label}
                        </Typography>
                    )}
                </Box>
                <Button variant="contained" onClick={handleRate} disabled={value == null}>Ohodnotit</Button>
            </Stack>
        </Container>
    );
}
