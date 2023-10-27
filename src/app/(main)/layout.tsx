"use client"
import { MyMultiLevelDropdown } from '../_components/Sidebar'
import { ApolloWrapper } from './_lib/ApolloWrapper'
import { ApolloProvider } from '@apollo/client'
// import client from './_lib/client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <ApolloProvider client={client}> */}
      <ApolloWrapper>
        <MyMultiLevelDropdown />
        {children}
      </ApolloWrapper>
      {/* </ApolloProvider> */}
    </>
  )
}
