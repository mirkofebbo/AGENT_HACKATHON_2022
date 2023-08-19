import React, { useState } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { startAgent } from '../components/DashboardService';

const handleStartAgent = async () => {
  try {
    const result = await startAgent();
    console.log('Agent started:', result);
  } catch (error) {
    console.error('Error starting agent:', error);
  }
};

function HomePage() {
  const theme = useTheme();
  const [selectedPerson, setSelectedPerson] = useState('');

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  // Define the list of individuals
  const people = [
    { name: 'Elon Musk', value: 'Elon Musk' },
    { name: 'Jeff Bezos', value: 'Jeff Bezos' },
    { name: 'Bernard Arnault', value: 'Bernard Arnault' },
    // Add more people here
  ];

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Welcome to My Website
      </Typography>
      <Typography variant="body1" paragraph>
        This is the home page of my React and Material-UI website.
      </Typography>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: theme.spacing(2) }}>
        <InputLabel id="person-select-label">Select a Person</InputLabel>
        <Select
          labelId="person-select-label"
          id="person-select"
          value={selectedPerson}
          onChange={handleChange}
          label="Select a Person"
        >
          {people.map((person) => (
            <MenuItem key={person.value} value={person.value}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleStartAgent}>
        Start Agent
      </Button>

    </Container>
  );
}

export default HomePage;
