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
import RatingIcon, {
    ratingIcons,
} from "../../../../components/complex/RatingIcon";
import Link from "next/link";
import * as React from "react";
import PageTitle from "../../../../components/PageTitle";
import ReturnBackButton from "../../../../components/complex/ReturnBackButton";
import TextField from "@mui/material/TextField";

export default function OfferRating() {
    const {state, setOffer} = useContext(StateContext);
    const router = useRouter();
    const {id} = router.query;
    const offer = getOffer(state.offerList, Number(`${id}`));
    const [canChangeOpinion, setCanChangeOpinion] = useState(false);
    const [comment, setComment] = useState("");

    const [value, setValue] = useState<number | null>(null);
    const [hover, setHover] = useState(-1);
    const selectedIndex = hover !== -1 ? hover : value;

    function handleRate() {
        if (value == null) {
            return;
        }
        offer.rating = {
            score: value,
            comment: comment
        };
        setOffer(offer);
        setCanChangeOpinion(true);
    }

    if (offer.rating != undefined) {
        return (
            <Container maxWidth="sm" sx={{paddingBottom: "2rem"}}>
                <Stack spacing={3} sx={{alignItems: "center"}}>
                    <Box flexGrow={1} width={"100%"}>
                        <WorkCard offer={offer}></WorkCard>
                    </Box>
                    <Typography variant="h6" fontWeight={400} color={"#01579b"}>
                        Tato nabídka byla ohodnocena s hodnocením:
                    </Typography>
                    {canChangeOpinion &&
                        <Button
                            color="warning"
                            onClick={() => {
                                offer.rating = undefined;
                                setOffer(offer);
                            }}
                        >
                            Změnit hodnocení
                        </Button>
                    }
                    <RatingIcon rating={offer.rating.score}/>
                    <Typography
                        sx={{
                            mt: 2,
                            fontWeight: "500",
                            fontSize: "1.5rem",
                            color: "#01579b",
                        }}
                    >
                        {ratingIcons[offer.rating.score].label}
                    </Typography>
                    <Typography>{offer.rating.comment}</Typography>
                    <Link href={`/my`}>
                        <Button variant="contained">Hotovo</Button>
                    </Link>
                </Stack>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{paddingBottom: "2rem"}}>
            <ReturnBackButton/>
            <PageTitle>Hodnocení</PageTitle>
            <Stack spacing={3} mt={"1em"}>
                <WorkCard offer={offer}></WorkCard>
                <Typography variant="h6" fontWeight={400} color={"#01579b"}>
                    Jaká byla vaše zkušenost s nabídkou?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {Object.keys(ratingIcons).map((it) => {
                            const index = Number(it);
                            return (
                                <IconButton
                                    key={it}
                                    size="small"
                                    onClick={() => {
                                        setValue(index);
                                    }}
                                    onMouseEnter={() => {
                                        setHover(index);
                                    }}
                                    onMouseLeave={() => {
                                        setHover(-1);
                                    }}
                                >
                                    <RatingIcon
                                        rating={index}
                                        selected={index === selectedIndex}
                                    />
                                </IconButton>
                            );
                        })}
                    </Box>
                    {selectedIndex !== null && (
                        <Typography
                            sx={{
                                mt: 1,
                                fontWeight: "600",
                                fontSize: "1.5rem",
                                color: "#01579b",
                            }}
                        >
                            {ratingIcons[selectedIndex].label}
                        </Typography>
                    )}
                </Box>
                <TextField
                    label="Komentář k hodnocení"
                    multiline
                    rows={1}
                    variant="standard"
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleRate}
                    disabled={value == null}
                >
                    Ohodnotit
                </Button>
            </Stack>
        </Container>
    );
}
