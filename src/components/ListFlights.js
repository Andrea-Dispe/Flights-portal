import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

import { ThreeDots } from 'react-loading-icons';

const ListFlights = ({ filteredFlights, loading, noData }) => {
  return (
    <>
      <TableContainer sx={{ marginTop: '30px' }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Airline</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights
              ? filteredFlights.map((row) => (
                  <TableRow key={row.departureAirportId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.deparureAirportCode}
                    </TableCell>
                    <TableCell>{row.arrivalAirportCode}</TableCell>
                    <TableCell>{row.airlineName}</TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container sx={{ height: '200px' }} justifyContent="center" alignItems="center">
        {!filteredFlights && !loading && !noData ? (
          <Typography align="center">Select the destination and the arrival airport</Typography>
        ) : (
          ''
        )}
        {!filteredFlights && loading && !noData ? <ThreeDots fill="#06bcee" stroke="transparent" /> : ''}
        {!filteredFlights && noData ? "Sorry, we couldn't find any flight with the provided airports" : ''}
      </Grid>
    </>
  );
};

export default ListFlights;
