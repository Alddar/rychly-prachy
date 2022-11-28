import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {useContext} from "react";
import WorkCard from "../../../../components/complex/WorkCard";
import {LatLngExpression} from "leaflet";
import {getOffer, getProvider} from "../../../../fixtures/app";
import {StateContext} from "../../../_app";
import {useRouter} from "next/router";

export default function OfferRating() {
    const { state, setOffer } = useContext(StateContext)
    const router = useRouter()
    const { id } = router.query
    const offer = getOffer(state.offerList, Number(`${id}`));
    const provider = getProvider(state.providerList, offer.ownerId)

    const position: LatLngExpression = offer.position;

    return (
        <Container maxWidth="sm" sx={{ paddingBottom: "2rem" }}>
        <Stack spacing={3}>
            <WorkCard offer={offer}></WorkCard>
            <Typography variant="h5">Hodnocení</Typography>

        </Stack>
        </Container>
    );
}
