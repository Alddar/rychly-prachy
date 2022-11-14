import WorkCard from "../components/complex/WorkCard";
import { Stack, Typography } from "@mui/material";

const workList = [
  {
    title: "Název práce",
    distance: "0.5km",
    location: "Lokalita",
    date: "23. 10",
    price: "100 Kč/h",
    duration: "3 hod",
  },
  {
    title: "Název práce",
    distance: "0.5km",
    location: "Lokalita",
    date: "23. 10",
    price: "100 Kč/h",
    duration: "3 hod",
  },
  {
    title: "Název práce",
    distance: "0.5km",
    location: "Lokalita",
    date: "23. 10",
    price: "100 Kč/h",
    duration: "3 hod",
  },
];

export default function Home() {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Nabídky
      </Typography>
      <Stack spacing={2}>
        {workList.map((work, idx) => (
          <WorkCard key={`work-card-${idx}`} {...work} />
        ))}
      </Stack>
    </>
  );
}
