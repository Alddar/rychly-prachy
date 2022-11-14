import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  distance: string;
  location: string;
  date: string;
  price: string;
  duration: string;
};

export default function WorkCard({
  title,
  distance,
  location,
  date,
  price,
  duration,
}: Props) {
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
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {distance}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            {date}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {price}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {duration}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
