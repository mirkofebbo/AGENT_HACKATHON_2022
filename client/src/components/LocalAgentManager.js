const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../data/agents.json');

// Read agent data from JSON file
const getAgents = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data).agents || [];
};

// Save agent data to JSON file
const saveAgent = (agents) => {
  const data = { agents };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Update agent data in JSON file
export const updateAgent = (agentId, name, individual, runId) => {
  const agents = getAgents();
  const updatedAgents = agents.map((agent) => {
    if (agent.agentId === agentId) {
      return { ...agent, name, individual, runId };
    }
    return agent;
  });
  saveAgent(updatedAgents);
};

// Get agent by individual name from JSON file
export const getAgentByIndividual = (individual) => {
  const agents = getAgents();
  return agents.find((agent) => agent.individual === individual);
};

// Add run output to agent data in JSON file
export const addRunOutput = (agentId, runId, output) => {
  const agents = getAgents();
  const updatedAgents = agents.map((agent) => {
    if (agent.agentId === agentId) {
      const runOutput = { runId, output };
      return { ...agent, runOutputs: [...(agent.runOutputs || []), runOutput] };
    }
    return agent;
  });
  saveAgent(updatedAgents);
};
