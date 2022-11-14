import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import Image from "next/image";


const options = ["Praha", "Brno", "Ostrava", "Hradec Králové", "Plzeň"];

export default function Filter() {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Lokalita" />}
      />
    </div>
  );
}
