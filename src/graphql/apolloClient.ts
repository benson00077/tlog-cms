import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

/**
 *  Apollo Link overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *  Apollo client authentication: https://www.apollographql.com/docs/react/networking/authentication/
 *  TODO: HttpLink -> BatchHttpLink
 *  TOOD: err of different NODE_ENV and Authentication like login
 */

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER });
const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  return { 
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]), // provide a link chain to ApolloClient
  cache: new InMemoryCache(),
});

export default client;
