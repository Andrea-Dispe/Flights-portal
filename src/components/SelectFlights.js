import {Grid, TextField, Button} from '@mui/material';

export default function SelectFlights({ handleChange, handleSubmit, departureAirport }) {
  return (
    <Grid wrap="nowrap" container component="form" noValidate autoComplete="on" gap={2}>
      <Grid Item xs={12} sm={5}>
        <TextField
          sx={{ width: '100%' }}
          id="departureAirport"
          list="airports"
          label="Departure Airport"
          variant="outlined"
          onChange={handleChange}
          value={departureAirport}
        />
      </Grid>
      <Grid Item xs={12} sm={5}>
        <TextField
          sx={{ width: '100%' }}
          id="arrivalAirport"
          label="Arrival Airport"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>

      <Grid Item xs={6} sm={2} container alignItems="center">
        <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%', height: 40 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
