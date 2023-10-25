import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className='bg-gray-50 dark:bg-gray-900'>
        {children}
      </body>
    </html>
  )
}
