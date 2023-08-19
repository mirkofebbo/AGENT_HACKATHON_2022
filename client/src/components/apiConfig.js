//2b0eca74-8aa1-4402-8f21-368ba2fd787f
export const apiConfig = {
    baseURL: 'http://localhost:3000/api/v1', // Replace {{URL}} with the actual base URL
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': '2b0eca74-8aa1-4402-8f21-368ba2fd787f', // Replace with your actual API key
    },
  };
  
  export const agentAPI = {
    startAgent: '/agent',
    resumeAgent: '/agent/{agent_id}/resume', 
    runAgent: '/agent/{agent_id}/run', 

  };
  