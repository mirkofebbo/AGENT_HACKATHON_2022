import axios from 'axios';
import { apiConfig, agentAPI } from './apiConfig';

export const startAgent = async (agentData) => {
    try {
        const response = await axios.post(
            `${apiConfig.baseURL}${agentAPI.startAgent}`,
            agentData,
            { headers: apiConfig.headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error starting agent:', error);
        throw error;
    }
};

export const runAgent = async (agentId) => {
    try {
        const url = `${apiConfig.baseURL}${agentAPI.runAgent.replace('{agent_id}', agentId)}`;
        const response = await axios.post(url, {}, { headers: apiConfig.headers });
        return response.data;
    } catch (error) {
        console.error('Error running agent:', error);
        throw error;
    }
};


export const resumeAgent = async (agentId, runIds) => {
    try {
        const url = `${apiConfig.baseURL}${agentAPI.resumeAgent.replace('{agent_id}', agentId)}`;
        const data = { run_ids: runIds };
        const response = await axios.post(url, data, { headers: apiConfig.headers });
        return response.data;
    } catch (error) {
        console.error('Error resuming agent:', error);
        throw error;
    }
};


export const getRunStatus = async (agentId, statusFilter) => {
    try {
        const url = `${apiConfig.baseURL}/agent/${agentId}/run-status`;
        const data = { run_status_filter: statusFilter };
        const response = await axios.post(url, data, { headers: apiConfig.headers });
        return response.data;
    } catch (error) {
        console.error('Error getting run status:', error);
        throw error;
    }
};

export const getRunOutput = async (runIds) => {
    try {
        const url = `${apiConfig.baseURL}/agent/resources/output`;
        const data = { run_ids: runIds };
        const response = await axios.post(url, data, { headers: apiConfig.headers });
        return response.data;
    } catch (error) {
        console.error('Error getting run output:', error);
        throw error;
    }
};




