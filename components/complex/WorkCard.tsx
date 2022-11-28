import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Offer, OfferStatus } from "../../models/app";

export type WorkCardProps = {
  offer: Offer;
};

export default function WorkCard({ offer }: WorkCardProps) {
  return (
    <Card sx={{ minWidth: 275 }} variant={"outlined"}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#e1f5fe",
          alignItems: "baseline",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            color={"#01579b"}
            gutterBottom
            fontWeight={400}
          >
            {offer.title}
          </Typography>
          <Typography variant="subtitle2" component="div" fontStyle={"italic"}>
            {offer.distance} km
          </Typography>
          <Typography variant="subtitle2">{offer.location}</Typography>
        </Box>
        <Box textAlign={"right"} justifyContent={"flex-end"}>
          <Typography variant="subtitle2" gutterBottom whiteSpace={"nowrap"}>
            <div suppressHydrationWarning={true}>
              {offer.date.toLocaleString()}
            </div>
          </Typography>
          <Typography variant="subtitle2" component="div">
            {offer.price} Kč/hod
          </Typography>
          <Typography variant="subtitle2">{offer.duration}h</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
