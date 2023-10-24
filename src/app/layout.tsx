import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
    <html lang="en">
      <body>
        <MyMultiLevelDropdown />
        {children}
      </body>
    </html>
  )
}
