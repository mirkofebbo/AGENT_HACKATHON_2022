// Save agent data to local storage
export const saveAgent = (agent) => {
  localStorage.setItem('agents', JSON.stringify(agent));
};

// Get agent data from local storage
export const getAgents = () => {
  return JSON.parse(localStorage.getItem('agents') || '[]');
};

// Update agent data in local storage
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

// Get agent by individual name from local storage
export const getAgentByIndividual = (individual) => {
  const agents = getAgents();
  return agents.find((agent) => agent.individual === individual);
};

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
