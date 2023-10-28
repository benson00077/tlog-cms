import { MyMultiLevelDropdown } from '../_components/Sidebar'
import { ApolloWrapper } from './_lib/ApolloWrapper'

export default async function LayoutWithRef({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ApolloWrapper>
        <MyMultiLevelDropdown />
        {children}
      </ApolloWrapper>
    </>
  )
}
