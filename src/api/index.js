import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: new HttpLink({
        uri: 'http://localhost:9090/graphql',
    }),
});

export default client;