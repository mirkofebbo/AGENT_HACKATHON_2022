import React, { useState } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { startAgent, runAgent, getRunStatus, getRunOutput } from '../components/DashboardService';
import { startAndRunAgent } from '../components/AgentService';

function HomePage() {
  const theme = useTheme();
  const [selectedIndividual, setSelectedIndividual] = useState('');

  const handleChange = (event) => {
    setSelectedIndividual(event.target.value);
  };

  const handleStartAgent = async () => {


    try {
    const runResult = await startAndRunAgent(selectedIndividual);  
    console.log('Agent started:', runResult);

    } catch (error) {
      console.error('Error starting agent:', error);
    }
  };

  // Define the list of individuals
  const individuals = [
    { name: 'Bill Gates', value: 'Bill Gates' },
    { name: 'Elon Musk', value: 'Elon Musk' },
    { name: 'Jeff Bezos', value: 'Jeff Bezos' },
    // Add more individuals here
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
        <InputLabel id="individual-select-label">Select an Individual</InputLabel>
        <Select
          labelId="individual-select-label"
          id="individual-select"
          value={selectedIndividual}
          onChange={handleChange}
          label="Select an Individual"
        >
          {individuals.map((individual) => (
            <MenuItem key={individual.value} value={individual.value}>
              {individual.name}
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
