import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

/**
 *  Apollo Link overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *  Apollo client authentication: https://www.apollographql.com/docs/react/networking/authentication/
 *  TODO: HttpLink -> BatchHttpLink
 *  TOOD: err of different NODE_ENV and Authentication like login
 */
const serverURI = process.env.NEXT_PUBLIC_API_GQL_URL
if (!serverURI) throw new Error('❌ Please provide NEXT_PUBLIC_API_GQL_URL .env.development or .env.production.')
const httpLink = new HttpLink({
  uri: serverURI,
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  fetchOptions: { cache: "no-store" },
  // you can override the default `fetchOptions` on a per query basis
  // via the `context` property on the options passed as a second argument
  // to an Apollo Client data fetching hook, e.g.:
  // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
});

/** @deprecated */
const authLink = setContext((_, { headers }) => {
  //FIXME: this is not gonna work in SSR, should login and get jwt to pass into ApolloWrapper
  //TODO:  also, define it in HttpLink?
  //TODO: or just use purly client-side solution, since they're still discussing, ref: https://github.com/apollographql/apollo-client/pull/11275
  const token = window.localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(
        `[🆘 GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (extensions.code === "UNAUTHENTICATED") {
        console.log(extensions) // 
        console.log(message) // === 'Unauthorized' when expired

        // NOTICE: message is defined in back end logic
        if (message === 'Unauthroized') {
          alert("Expired session. Please log in again")
        } else {
          // e.g. wrong pwd 
          alert(message)
        }

        window.localStorage.clear();
        const loginURI = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL + '/login' : '/login';
        window.location.replace(loginURI);
      }
    });
  }
  if (networkError) console.log(`[🆘 Network error]: ${networkError}`);
});


/** ref: https://github.com/apollographql/apollo-client-nextjs#readme */
export function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(), // not the normal `InMemoryCache`
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          // in a SSR environment, if you use multipart features like
          // @defer, you need to decide how to handle these.
          // This strips all interfaces with a `@defer` directive from your queries.
          new SSRMultipartLink({
            stripDefer: true,
          }),
          errorLink,
          authLink,
          httpLink
        ])
        : ApolloLink.from([errorLink, authLink, httpLink]),
  })
}


/**
 *  @deprecated since using Next.js app router, each Client Component will be SSR-rendered for the initial request. 
 */
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]), // provide a link chain to ApolloClient
  cache: new InMemoryCache(),
});

export default client;