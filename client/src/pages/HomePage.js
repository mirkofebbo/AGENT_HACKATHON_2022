import React, { useState } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { startAgent, runAgent, getRunStatus, getRunOutput } from '../components/DashboardService';
import { startAndRunAgent } from '../components/AgentService';

import { readAgents, writeAgents, updateAgent, getAgentByIndividual } from '../components/LocalAgentManager'; // Import the local agent management functions

function HomePage() {
  const theme = useTheme();
  const [selectedIndividual, setSelectedIndividual] = useState('');
  const [agentId, setAgentId] = useState(null); 
  const [runId, setRunId] = useState(null);

  const handleChange = (event) => {
    setSelectedIndividual(event.target.value);
    const existingAgent = getAgentByIndividual(event.target.value);
    if (existingAgent) {
      setAgentId(existingAgent.agentId);
    } else {
      setAgentId(null);
    }
  };

  const handleStartAgent = async () => {
    try {
      const runResult = await startAndRunAgent(selectedIndividual, agentId);
      setAgentId(runResult.agentId);
      setRunId(runResult.runResult.run_id);
      console.log('Agent started:', runResult);

      // Update the local agent information
      updateAgent(runResult.agentId, "Corporate Affiliations", selectedIndividual, runResult.runResult.run_id);
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
