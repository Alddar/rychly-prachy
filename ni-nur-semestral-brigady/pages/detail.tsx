import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import WorkCard from "../components/complex/WorkCard";
import { Offer } from "../models/offer";
import { DateTime } from "luxon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { LatLngExpression } from "leaflet";
import Map from "../components/map";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/StarOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {getOffer, getUser} from "../models/dataContainer";

export default function Filter() {
  const offer = getOffer(1);
  const user = getUser(offer.ownerId)

  const position: LatLngExpression = offer.position;

  const [isInterestGiven, setInterestGiven] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: "2rem" }}>
      <Stack spacing={3}>
        <WorkCard offer={offer}></WorkCard>
        <Typography>{offer.description}</Typography>
        <Typography variant="h5">Požadavky</Typography>
        <List>
          {offer.requirements.map((requirement, i) => (
            <ListItem disablePadding key={i}>
              {requirement}
            </ListItem>
          ))}
        </List>
        <Typography variant="h5">Lokalita</Typography>
        <Map
          className="detail-map"
          center={position}
          zoom={15}
          scrollWheelZoom={false}
        >
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}></Marker>
            </>
          )}
        </Map>
        {!isInterestGiven ? (
          <>
            <Typography variant="h5">Zadavatel</Typography>
            <Box sx={{ display: "flex" }}>
              <Avatar sx={{ bgcolor: "#fb3", marginRight: "1rem" }}>M</Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{user.name}</Typography>
                <Typography variant="caption">
                  {user.rating} <StarIcon sx={{ fontSize: 11 }} />
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" onClick={() => setInterestGiven(true)}>
              Projevit zájem a získat kontakt
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5">Kontakt</Typography>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography variant="h6">
                  {user.name}{" "}
                  <Typography variant="caption">
                    {user.rating} <StarIcon sx={{ fontSize: 11 }} />
                  </Typography>
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={user.phone} />
              </ListItem>
            </List>
            <Button variant="contained" onClick={() => setInterestGiven(false)}>
              Zrušit zájem
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
}
