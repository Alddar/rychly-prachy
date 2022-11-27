import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from "@mui/material/Stack";

const options = ["Praha", "Brno", "Ostrava", "Hradec Králové", "Plzeň"];

const distanceMarks = [{
  value: 1
},{
  value: 5
},{
  value: 10
},{
  value: 20
},{
  value: 30
},{
  value: 50
}]

const cashMarks = [{
  value: 90
},{
  value: 100
},{
  value: 120
},{
  value: 150
},{
  value: 200
},{
  value: 250
}]

export default function Filter() {
  return (
    <Container maxWidth="sm">
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">Filtrovat</Typography>
        <Autocomplete
          disablePortal
          options={options}
          renderInput={(params) => <TextField {...params} label="Lokalita" />}
        />
        <div>
          <label>Vzdálenost</label>
          <Slider
            step={null}
            max={50}
            min={1}
            marks={distanceMarks}
            getAriaLabel={() => 'Vzdálenost'}
            valueLabelFormat={(value) => `<${value}km`}
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Odměna</label>
          <Slider
            step={null}
            min={90}
            max={250}
            marks={cashMarks}
            getAriaLabel={() => 'Odměna'}
            valueLabelFormat={(value) => `>${value}kč`}
            valueLabelDisplay="auto"
          />
        </div>
        <DateTimePicker
            label="Datum"
            value={new Date()}
            onChange={console.log}
            renderInput={(params) => <TextField {...params} />}
          />
        <Button variant="contained">Potvrdit</Button>
      </Stack>
    </Container>
  );
}
