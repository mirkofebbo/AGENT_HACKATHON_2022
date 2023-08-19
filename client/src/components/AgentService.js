import { startAgent, runAgent } from '../components/DashboardService';

export async function startAndRunAgent(selectedIndividual) {

    const agentData = {
        "name": "Corporate Affiliations",
        "description": `Search online for corporations affiliated with or owned by ${selectedIndividual}.`,
        "goal": [`Create a detailed list of corporations affiliated with or owned by ${selectedIndividual} and save it following the provided data structure.`],
        "agent_workflow": "Goal Based Workflow",
        "constraints": [
          "4000-word limit for short-term memory.",
          "Use only the commands listed in double quotes."
        ],
        "instruction": [
          `Search online for corporations affiliated with ${selectedIndividual}.`,
          `Compile the information into a structured format with the following schema: class 'CorporateAffiliations', properties including 'individualName' (string), 'corporations' (string array), and 'description' (string).`,
          `Save the structured information in the database following the provided schema.`,
          "Return the confirmation of the saved data as the final response.",
        ],
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
        "iteration_interval": 1000,
        "model": "gpt-3.5-turbo",
        "max_iterations": 10,
        "schedule": null
      };
    console.log('Starting agent:', agentData);
    try {
        const result = await startAgent(agentData);
        console.log('Agent started:', result);

        // Extract the agent ID from the result
        const agentId = result.agent_id;

        // Call runAgent with the agent ID
        const runResult = await runAgent(agentId);
        return runResult;
    } catch (error) {
        console.error('Error starting agent:', error);
        throw error;
    }
}
