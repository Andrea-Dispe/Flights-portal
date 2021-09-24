import './App.css';
import { useState, useEffect } from 'react';
import { bearerToken, allFlightsURL, allAirportsURL, allAirlinesURL, flightsFromTo } from './config';

//mui
import { Grid, Container } from '@mui/material';

//components
import ListFlights from './components/ListFlights';
import AirportsSelectionBox from './components/AirportsSelectionBox';
import SelectFlights from './components/SelectFlights';

function App() {
  const [departureAirport, setDepartureAirport] = useState();
  const [arrivalAirport, setArrivalAirport] = useState();
  const [filteredFlights, setFilteredFlights] = useState();
  const [airportsNames, setAirportsNames] = useState([]);

  const [allAirports, setAllAirports] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [allAirlines, setAllAirlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const bearer = {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
    },
  };
  useEffect(() => {
    fetch(allAirportsURL, bearer)
      .then((response) => response.json())
      .then((data) => setAllAirports(data.data));
    fetch(allFlightsURL, bearer)
      .then((response) => response.json())
      .then((data) => setAllFlights(data.data));
    fetch(allAirlinesURL, bearer)
      .then((response) => response.json())
      .then((data) => setAllAirlines(data.data));
  }, []);

  useEffect(() => {
    const airportsNames = allAirports.map((airportObject) => airportObject.codeIata);
    setAirportsNames(airportsNames);
  }, [allAirports]);

  function findFlights() {
    fetch(flightsFromTo, bearer)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          const findAirportByID = (airportID) => {
            return allAirports.filter((item) => item.id === airportID);
          };
          const findAirlineByID = (airlineID) => {
            return allAirlines.filter((item) => item.id === airlineID);
          };

          data.data.forEach((flight) => {
            const departureAirport = findAirportByID(flight.departureAirportId);
            if (departureAirport[0]) flight.deparureAirportCode = departureAirport[0].codeIata;
            const arrivalAirport = findAirportByID(flight.arrivalAirportId);
            if (arrivalAirport[0]) flight.arrivalAirportCode = arrivalAirport[0].codeIata;
            const airline = findAirlineByID(flight.airlineId);
            if (airline[0]) flight.airlineName = airline[0].name;
          });

          setFilteredFlights(data.data);
          setLoading(false);
        } else if (data.data) {
          setFilteredFlights(data.data);
          setLoading(false);
        } else {
          setNoData(true);
          setLoading(false);
        }
      });
  }

  function resetFlights() {
    setFilteredFlights();
    setNoData(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetFlights();
    setLoading(true);
    findFlights(departureAirport, arrivalAirport);
  }

  function handleChange(e) {
    if (e.target.id === 'departureAirport') {
      setDepartureAirport(e.target.value.toUpperCase());
    }
    if (e.target.id === 'arrivalAirport') {
      setArrivalAirport(e.target.value.toUpperCase());
    }
  }

  function selectAirportCode(e) {
    setDepartureAirport(e.target.innerText);
  }

  return (
    <Container sx={{ paddingTop: '50px' }} maxWidth="xl">
      <SelectFlights handleChange={handleChange} handleSubmit={handleSubmit} departureAirport={departureAirport} />
      <Grid sx={{ marginTop: '30px' }} container justify="center" align="center">
        <AirportsSelectionBox airportsNames={airportsNames} selectAirportCode={selectAirportCode} />
      </Grid>
      <ListFlights filteredFlights={filteredFlights} loading={loading} noData={noData} />
    </Container>
  );
}

export default App;
