import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8084/', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;