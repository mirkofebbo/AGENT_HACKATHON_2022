// import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';
// const client: WeaviateClient = weaviate.client({
//     scheme: 'https',
//     host: 'hackathon-yllyh5nd.weaviate.network',
//     apiKey: new ApiKey('rcZs1b8lI22n7xteexK9O9opHFPAfiK5Bcu5'),
// });

// const WeaviateService = {
//     addSchema: async (customSchema) => {

//         const res = await client.schema.classCreator().withClass(customSchema).do();
//         console.log(res);
//     },

//     getSchema: async () => {
//         const response = await client.schema.getter().do();
//         return response;
//     },

//     get: async (ClassName, Fields) => {
//         const response = await client.graphql
//             .get()
//             .withClassName(ClassName)
//             .withFields(Fields)
//             .do();
//         return response;
//     },

//     updateObject: async (id, className, properties) => {
//         const response = await client.data
//             .merger() // merges properties into the object
//             .withId(id)
//             .withClassName(className)
//             .withProperties(properties)
//             .do();
//         return response;
//     },

//     deleteClass: async (className) => {
//         await client.schema
//             .classDeleter()
//             .withClassName(className)
//             .do();
//     },

//     getObjectsByConcepts: async (className, concepts, fields) => {
//         const response = await client.graphql
//             .get()
//             .withClassName(className)
//             .do();
//         return response;
//     },


// };

// export default WeaviateService;

