import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

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
    <div>
      <h1>Filtry</h1>
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label="Lokalita" />}
      />
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
      <label>Datum</label>
    </div>
  );
}
