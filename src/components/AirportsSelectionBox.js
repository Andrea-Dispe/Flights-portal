import {Box, Button, Grid} from '@mui/material';
import { ThreeDots } from 'react-loading-icons';


export default function AirportsSelectionBox({ airportsNames, selectAirportCode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ minHeight: '156px' }} container spacing={2} justifyContent="center" alignItems="center">
        {airportsNames.length > 0 ? (
          airportsNames.map((airport) => (
            <Grid item xs={3} sm={2}>
              <Button
                sx={{ backgroundColor: '#FFFFFF', color: '#000000', width: '100%', '&:hover': { backgroundColor: '#93faa1' } }}
                variant="contained"
                onClick={selectAirportCode}
              >
                {airport}
              </Button>
            </Grid>
          ))
        ) : (
            <ThreeDots fill="#06bcee" stroke="transparent" />
        )}
      </Grid>
    </Box>
  );
}
