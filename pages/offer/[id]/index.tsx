import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import WorkCard from "../../../components/complex/WorkCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { LatLngExpression } from "leaflet";
import Map from "../../../components/map";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/StarOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { getOffer, getProvider, offerList } from "../../../fixtures/app";
import { StateContext } from "../../_app";
import { useRouter } from "next/router";
import { OfferStatus } from "../../../models/app";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import RatingIcon from "../../../components/complex/RatingIcon";
import {Alert, Modal} from "@mui/material";
import ReturnBackButton from "../../../components/complex/ReturnBackButton";
import {ArrowRight, Check, Email, PhoneIphone} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";

export function getStaticPaths() {
  return {
    paths: offerList.map((offer) => ({ params: { id: `${offer.id}` } })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    // Passed to the page component as props
    props: {},
  };
}

export default function Offer() {
  const { state, setOffer } = useContext(StateContext);
  const router = useRouter();
  const { id } = router.query;
  const offer = getOffer(state.offerList, Number(`${id}`));
  const provider = getProvider(state.providerList, offer.ownerId);

  const position: LatLngExpression = offer.position;

  function handleInterest() {
    if (!state.user) {
      console.log("Not logged in");
      return;
    }
    offer.interested = state.user;
    setOffer(offer);
    handleClose();
  }

  function handleCancelInterest() {
    offer.interested = undefined;
    setOffer(offer);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: "2rem", px: 0 }}>
      <ReturnBackButton />
      <Stack spacing={3} >
        <WorkCard offer={offer}></WorkCard>
        <Box bgcolor={'#e1f5fe'} p={'12px'}>
          <Typography variant="h5" color={"#01579b"} mb={'8px'}>
            Popis
          </Typography>
          <Typography variant={'body1'} >{offer.description}</Typography>
        </Box>
        <Box bgcolor={'#e1f5fe'} p={'12px'}>
        <Typography variant="h5" color={"#01579b"}>
          Požadavky
        </Typography>
        <List>
          {offer.requirements.map((requirement, i) => (
            <ListItem
              disablePadding
              key={`offer-${offer.id}-requirement-${i}`}
            >
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
              <ListItemText primary={requirement} />
            </ListItem>
          ))}
        </List>
        </Box>
        <Typography variant="h5" color={"#01579b"}>
          Lokalita
        </Typography>
        <Box bgcolor={'#e1f5fe'} p={'12px'}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <HomeIcon color={"primary"} />
          <Typography variant="h6" color={"#01579b"} fontWeight={400}>
            Adresa
          </Typography>
        </Stack>
        <Typography variant="body1">
          {offer.address}
        </Typography>
        </Box>
        <Map
          className="detail-map"
          center={position}
          zoom={15}
          scrollWheelZoom={false}
        >
          {({ TileLayer, Marker, Popup }: any) => (
            <>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}></Marker>
            </>
          )}
        </Map>
        {!offer.interested ? (
          <>
            <Box bgcolor={'#e1f5fe'} p={'12px'}>
            <Typography variant="h5" color={"#01579b"} mb={'8px'}>
              Zadavatel
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Avatar sx={{ bgcolor: "#fb3", marginRight: "1rem", border: '1px solid #b3e5fc', backgroundColor: '#039be5' }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{provider.name}</Typography>
                <Typography variant="caption">
                  {provider.rating} <StarIcon sx={{ fontSize: 11 }} />
                </Typography>
              </Box>
            </Box>
            </Box>
            {!state.user ? (
              <MuiLink href="/login" component={Link}>
                <Alert severity={"info"}>
                  Pro zájem o nabídku se musíte nejdříve přihlásit.
                </Alert>
              </MuiLink>
            ) : (
              <Button variant="contained" onClick={handleOpen}>
                Projevit zájem a získat kontakt
              </Button>
            )}
          </>
        ) : (
          <>
          <Box bgcolor={'#e1f5fe'} p={'12px'}>
            <Typography variant="h5" color={'#01579b'}>Kontakt</Typography>
            <Divider/>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography variant="h6" mt={'6px'} color={'#01579b'} fontWeight={500}>
                  {provider.name}{" "}
                  <Typography variant="caption">
                    {provider.rating} <StarIcon sx={{ fontSize: 11 }} />
                  </Typography>
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <MailIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText primary={provider.email} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneIphone color={'primary'} />
                </ListItemIcon>
                <ListItemText primary={provider.phone} />
              </ListItem>
            </List>
          </Box>
            {offer.status === OfferStatus.FREE && (
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelInterest}
              >
                Zrušit zájem
              </Button>
            )}
            {offer.status === OfferStatus.COMPLETED &&
              (!offer.rating ? (
                <Link
                  href={`/offer/${offer.id}/rating`}
                  key={`work-card-rating-${offer.id}`}
                >
                  <Button variant="contained" color="primary">
                    Ohodnotit
                  </Button>
                </Link>
              ) : (
                  <Box bgcolor={'#e1f5fe'} p={'12px'}>
                    <Typography variant="h5" color={"#01579b"}>Hodnocení</Typography>
                    <RatingIcon rating={offer.rating.score}/>
                    <Typography>{offer.rating.comment}</Typography>
                  </Box>
              ))}
          </>
        )}
      </Stack>
      <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box my={'1em'} height={'340px'} style={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          width: '90%',
          padding: '1em',
          backgroundColor: '#e1f5fe',
          transform: 'translate(-50%, -50%)',
        }}>
          <Typography id="modal-modal-title" color={'primary'} variant="h6" component="h2">
            Projevit zájem o nabídku
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Projevení zájmu o brigádu je závazné. <br/><br/> Dále souhlasíte, že využijete kontaktní údaje pouze pro komunikaci s poskytovatelem nabídky a nebudete je poskytovat třetím osobám.
            <br/><br/><strong >Přejete si pokračovat?</strong>
          </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={handleClose} color={'error'}>
                    Zrušit
                </Button>
                <Button variant="contained" onClick={handleInterest} sx={{ ml: 2 }} color={'primary'}>
                    Pokračovat
                </Button>
            </Box>
        </Box>
      </Modal>
    </Container>
  );
}
