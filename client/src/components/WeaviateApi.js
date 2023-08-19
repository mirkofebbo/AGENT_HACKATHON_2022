import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
    scheme: 'https',
    host: 'hackathon-yllyh5nd.weaviate.network',
    apiKey: new ApiKey('rcZs1b8lI22n7xteexK9O9opHFPAfiK5Bcu5'),
});

const WeaviateService = {
    addSchema: async () => {
        const classWithProps = {
            class: 'Agent',
            properties: [
                {
                    name: 'agentId',
                    dataType: ['string'],
                },
                {
                    name: 'name',
                    dataType: ['string'],
                },
                {
                    name: 'runId',
                    dataType: ['string'],
                },
                {
                    name: 'result',
                    dataType: ['string'],
                },
            ],
        };
        const res = await client.schema.classCreator().withClass(classWithProps).do();
        console.log(res);
    },

    getSchema: async () => {
        const response = await client.schema.getter().do();
        return response;
    },

    get: async (ClassName, Fields) => {
        const response = await client.graphql
            .get()
            .withClassName(ClassName)
            .withFields(Fields)
            .do();
        return response;
    },
    updateObject: async (id, className, properties) => {
        const response = await client.data
            .merger() // merges properties into the object
            .withId(id)
            .withClassName(className)
            .withProperties(properties)
            .do();
        return response;
    },
};

export default WeaviateService;