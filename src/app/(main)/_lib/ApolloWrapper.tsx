"use client"
// ^ this file needs the "use client" pragma
// https://github.com/apollographql/apollo-client-nextjs

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { makeClientWithRef } from "./client";
import { useRef } from "react";
import { useAuth } from "./AuthWrapper";

export function ApolloWrapper({ children, jwtOnSsr }: React.PropsWithChildren<{
  jwtOnSsr: string
}>) {
  const { jwt, setJwt } = useAuth()
  const jwtRef = useRef('');
  jwtRef.current = typeof window === 'undefined'
    ? jwtOnSsr
    : jwt

  return (
    <ApolloNextAppProvider makeClient={() => makeClientWithRef(jwtRef)}>
      {children}
    </ApolloNextAppProvider>
  );
}