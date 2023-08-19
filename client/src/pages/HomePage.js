import React, { useState } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { startAgent, runAgent } from '../components/DashboardService';

import WeaviateService from '../components/WeaviateApi';
WeaviateService.get('Agent', 'agentId name runId result');
WeaviateService.getSchema();

console.log(WeaviateService.getSchema());
const handleStartAgent = async () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setSeconds(now.getSeconds() + 10);

  const startTime = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(startTime)
  const agentData = {
    "name": "Corporate Affiliations",
    "description": "Search online for list of corporations an individual is affiliated with or own.",
    "goal": ["Create a list containing Bill Gates corporation he is affiliated with or own."],
    "agent_workflow": "Goal Based Workflow",
    "constraints": [
      "~4000 word limit for short term memory.",
      "Your short term memory is short, so immediately save important information to files.",
      "If you are unsure how you previously did something or want to recall past events, thinking about similar events will help you remember.",
      "No user assistance",
      "Exclusively use the commands listed in double quotes e.g. \"command name\""
    ],
    "instruction": ["Create a json file for the list with the corporation name and short description"],
    "tools": [
      {
        "name": "Searx Toolkit",
        "tools": ["SearxSearch"]
      },
      {
        "name": "File Toolkit",
        "tools": ["Read File", "Write File"]
      },
    ],
    "iteration_interval": 500,
    "model": "gpt-3.5-turbo",
    "max_iterations": 10,
    "schedule": null
  }

  try {
    const result = await startAgent(agentData);
    console.log('Agent started:', result);

    // Extract the agent ID from the result
    const agentId = result.agent_id;

    // Call runAgent with the agent ID
    const runResult = await runAgent(agentId);
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
