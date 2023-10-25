import type { Metadata } from 'next'
import { MyMultiLevelDropdown } from '../_components/Sidebar'

export const metadata: Metadata = {
  title: "CMS for Benson's blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MyMultiLevelDropdown />
      {children}
    </>
  )
}
