import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { DateTime } from "luxon";
import {Divider} from "@mui/material";

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

export interface FilterState {
  location: string | null
  distance: number
  cash: number
  from: DateTime | null
  to: DateTime | null
}

export const defaultFilterState: FilterState= {
  location: null,
  distance: 50,
  cash: 90,
  from: null,
  to: null,
};

interface FilterProps {
  state: FilterState
  setState: (newState: Partial<FilterState>) => void,
  setMenuOpen: (menuOpen: boolean) => void
}

export const Filter: FC<FilterProps> = ({ state, setState, setMenuOpen }) => 
    <Container maxWidth="sm" sx={{backgroundColor: '#e1f5fe', height: '100%'}}>
      <Stack spacing={3} pt={'16px'}>
        <Typography variant="h4" component="h1" color={'#01579b'}>Filtrovat</Typography>
        <Divider />
        <Autocomplete
          disablePortal
          options={options}
          value={state.location}
          onChange={(_, location) => setState({ location })}
          renderInput={(params) => <TextField {...params}  label="Lokalita" />}
        />
        <div>
          <Typography component={'label'} color={'#01579b'}>Vzdálenost</Typography>
          <Slider
            step={null}
            max={50}
            min={1}
            marks={distanceMarks}
            value={state.distance}
            onChange={(_, distance) => setState({ distance: distance as number })}
            getAriaLabel={() => 'Vzdálenost'}
            valueLabelFormat={(value) => `<${value}km`}
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <Typography component={'label'} color={'#01579b'}>Odměna</Typography>
          <Slider
            step={null}
            min={90}
            max={250}
            marks={cashMarks}
            value={state.cash}
            onChange={(_, cash) => setState({ cash: cash as number })}
            getAriaLabel={() => 'Odměna'}
            valueLabelFormat={(value) => `>${value}kč`}
            valueLabelDisplay="auto"
          />
        </div>
        <DatePicker
            label="Od"
            value={state.from}
            onChange={(from) => setState({ from })}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
              label="Do"
              value={state.to}
              onChange={(to) => setState({ to })}
              renderInput={(params) => <TextField {...params} />}
            />
        <Button variant="contained" onClick={() => setMenuOpen(false)}>Zavřít</Button>
        <Button variant="contained" color="error" onClick={() => {setState(defaultFilterState); setMenuOpen(false)}}>Zrušit filtry</Button>
      </Stack>
    </Container>

