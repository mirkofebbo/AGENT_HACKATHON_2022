import axios from 'axios';
import { apiConfig, agentAPI } from './apiConfig';

export const startAgent = async () => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}${agentAPI.startAgent}`,
      null,
      { headers: apiConfig.headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error starting agent:', error);
    throw error;
  }
};
