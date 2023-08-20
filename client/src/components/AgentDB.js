export const AgentDB = {
    db: null,

    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("myDatabase", 1);
            request.onerror = () => reject("Error opening database");
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.db.createObjectStore("agents", { keyPath: "id" });
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
        });
    },

    async add(agent) {
        const transaction = this.db.transaction(["agents"], "readwrite");
        const objectStore = transaction.objectStore("agents");
        return new Promise((resolve, reject) => {
            const request = objectStore.add(agent);
            request.onerror = () => reject("Error adding data");
            request.onsuccess = () => resolve();
        });
    },

    async get(id) {
        const transaction = this.db.transaction(["agents"]);
        const objectStore = transaction.objectStore("agents");
        return new Promise((resolve, reject) => {
            const request = objectStore.get(id);
            request.onerror = () => reject("Error retrieving data");
            request.onsuccess = () => resolve(request.result);
        });
    },

    async update(agent) {
        const transaction = this.db.transaction(["agents"], "readwrite");
        const objectStore = transaction.objectStore("agents");
        return new Promise((resolve, reject) => {
            const request = objectStore.put(agent);
            request.onerror = () => reject("Error updating data");
            request.onsuccess = () => resolve();
        });
    },

    async delete(id) {
        const transaction = this.db.transaction(["agents"], "readwrite");
        const objectStore = transaction.objectStore("agents");
        return new Promise((resolve, reject) => {
            const request = objectStore.delete(id);
            request.onerror = () => reject("Error deleting data");
            request.onsuccess = () => resolve();
        });
    },
    async getAgentByIndividual(individual) {
        const transaction = this.db.transaction(["agents"]);
        const objectStore = transaction.objectStore("agents");
        return new Promise((resolve, reject) => {
            const request = objectStore.openCursor();
            request.onerror = () => reject("Error retrieving data");
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.individual === individual) {
                        resolve(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(null); // No matching agent found
                }
            };
        });
    },

    async updateAgent(agentId, name, individual, runId) {
        const agent = await this.get(agentId);
        if (agent) {
            agent.name = name;
            agent.individual = individual;
            agent.runId = runId;
            return this.update(agent);
        } else {
            return Promise.reject("Agent not found");
        }
    }
};
