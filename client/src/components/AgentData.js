import fs from 'fs';
import path from 'path';

const agentFilePath = path.resolve(__dirname, 'agents.json');

export const getAgents = () => {
  const data = fs.readFileSync(agentFilePath, 'utf8');
  return JSON.parse(data);
};

export const saveAgent = (agent) => {
  const data = getAgents();
  data.agents.push(agent);
  fs.writeFileSync(agentFilePath, JSON.stringify(data, null, 2));
};

export const updateAgent = (agentId, updatedAgent) => {
  const data = getAgents();
  const agentIndex = data.agents.findIndex((agent) => agent.agent_id === agentId);
  if (agentIndex !== -1) {
    data.agents[agentIndex] = updatedAgent;
    fs.writeFileSync(agentFilePath, JSON.stringify(data, null, 2));
  }
};
