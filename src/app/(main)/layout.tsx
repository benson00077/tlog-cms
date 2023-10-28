import { MyMultiLevelDropdown } from '../_components/Sidebar'
import { ApolloWrapper } from './_lib/ApolloWrapper'
import { jwtSsr } from './_lib/utils'

export default async function LayoutWithRef({
  children,
}: {
  children: React.ReactNode
}) {

  const jwtOnSsr = await jwtSsr()
  return (
    <>
      <ApolloWrapper jwtOnSsr={jwtOnSsr}>
        <MyMultiLevelDropdown />
        {children}
      </ApolloWrapper>
    </>
  )
}
