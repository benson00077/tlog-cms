import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

/**
 *  Apollo Link overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *  TODO: HttpLink -> BatchHttpLink
 *  TOOD: err of different NODE_ENV and Authentication like login
 */

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path})=> {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]), // provide a link chain to ApolloClient
  cache: new InMemoryCache(),
});

export default client;
