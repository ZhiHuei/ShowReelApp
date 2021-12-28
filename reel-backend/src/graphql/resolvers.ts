import {data} from '../stub/clips';

export const resolvers = {
    Query: {
        clips: () => data,
    }
}