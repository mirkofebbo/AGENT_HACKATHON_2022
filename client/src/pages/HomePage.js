import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { startAgent, runAgent, getRunStatus, getRunOutput } from '../components/DashboardService';
import { startAndRunAgent } from '../components/AgentService';


function HomePage() {

  const theme = useTheme();

  const [selectedIndividual, setSelectedIndividual] = useState('');
  const [agentId, setAgentId] = useState(null);
  const [runId, setRunId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);


  const handleChange = (event) => {
    setSelectedIndividual(event.target.value);

    setAgentId(agentId);

  };


  useEffect(() => {
    let intervalId;

    // Function to check the run status
    const checkRunStatus = async () => {
      try {
        const statusFilter = "RUNNING";
        const runStatus = await getRunStatus(agentId, statusFilter);
        console.log('Run status:', runStatus);
        if (runStatus.status !== "RUNNING") {
          // If the run is completed, you can fetch the output
          const runOutput = await getRunOutput([runStatus.run_id]);
          console.log('Run output:', runOutput);
          // Stop checking the status
          clearInterval(intervalId);
          setIsRunning(false);
        } else {
          console.log('Run is not yet completed:', runStatus.status);
        }
      } catch (error) {
        console.error('Error checking run status:', error);
      }
    };

    // If the agent is running, set up an interval to check the status
    if (isRunning) {
      intervalId = setInterval(checkRunStatus, 5000); // Check every 5 seconds
    }

    // Clean up the interval when the component unmounts or the agent stops running
    return () => clearInterval(intervalId);
  }, [agentId, isRunning]); // Re-run the effect if agentId or isRunning changes

  const handleStartAgent = async () => {
    try {
      const runResult = await startAndRunAgent(selectedIndividual, agentId);
      setAgentId(runResult.agentId);
      setRunId(runResult.runResult.run_id);
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
          <MenuItem value="">Select an Individual</MenuItem> {/* Default option */}
          {individuals.map((individual) => (
            <MenuItem key={individual.value} value={individual.value}>
              {individual.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartAgent}
        disabled={!selectedIndividual || selectedIndividual === ''} // Disable if no individual selected
      >
        Start Agent
      </Button>
    </Container>

  );
}

export default HomePage;
