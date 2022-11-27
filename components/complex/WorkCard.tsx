import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Offer } from "../../models/app";

export type WorkCardProps = {
  offer: Offer
};

export default function WorkCard({
  offer
}: WorkCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            {offer.title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {offer.distance} km
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {offer.location}
          </Typography>
        </Box>
        <Box>
            <Typography variant="h5" gutterBottom>
              <div suppressHydrationWarning={true}>{offer.date.toLocaleString()}</div>
            </Typography>
          <Typography variant="subtitle2" component="div">
            {offer.price} Kč
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {offer.duration} h
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
