import { ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { MutableRefObject } from "react";

const serverURI = process.env.NEXT_PUBLIC_API_GQL_URL

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
        if (message === 'Unauthorized') {
          console.error("Expired session. Please log in again")
        } else {
          // e.g. wrong pwd 
          console.error(message)
        }

        if (typeof window !== 'undefined') {
          window.localStorage.clear();
          //FIXME: flikering error.tsx before back to login page. Caused by client component PostDetail's first render on server...
          const loginRoute = '/'
          window.location.replace(window.location.origin + loginRoute)
        }
      }
    });
  }
  if (networkError) console.log(`[🆘 Network error]: ${networkError}`);
});


/**
 *  Docs: https://github.com/apollographql/apollo-client-nextjs#readme
 * 
 *  NOTICE: still hacky. 
 *  ref: https://github.com/apollographql/apollo-client-nextjs/issues/103
 *  ref: https://github.com/apollographql/apollo-client-nextjs/issues/21
 *  ref: https://github.com/apollographql/apollo-client/pull/11275
 *  ref: https://github.com/apollographql/apollo-client-nextjs/pull/9
 *  ref: https://stackoverflow.com/questions/77188256/proper-way-to-store-a-token-retrieved-client-side-in-nextjs-13-app-router-vers
 */
export function makeClientWithRef(ref: MutableRefObject<string>) {
  // if you access `ref.current` from your `Link` here it will always be up to date with your React component.
  // \_ ref: https://github.com/apollographql/apollo-client-nextjs/issues/103#issuecomment-1741166043

  const httpLink = new HttpLink({
    uri: serverURI,
    fetchOptions: { cache: "no-store" },
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const jwt = ref.current
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${jwt}`,
        },
      }
    })
    return forward(operation)
  })

  // const links = [errorLink, authLink, httpLink]

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