import type { Metadata } from 'next'
import './globals.css'
import { MyMultiLevelDropdown } from './Sidebar'

export const metadata: Metadata = {
  title: "CMS for Benson's blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className='bg-gray-50 dark:bg-gray-900'>
        <MyMultiLevelDropdown/>
        {children}
      </body>
    </html>
  )
}
