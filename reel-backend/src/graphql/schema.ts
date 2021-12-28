import { gql } from 'apollo-server-express';

export const schema = gql`
    type Clip {
        name: String!
        description: String
        standard: String!
        definition: String!
        startTimecode: String!
        endTimecode: String!
    }

    type Query {
        clips: [Clip]
    }
`;