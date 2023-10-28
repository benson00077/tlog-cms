'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="p-8 bg-white dark:bg-gray-600 rounded shadow-lg">
        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Something went wrong!</h2>
        <p className="text-white mb-4">We apologize for the inconvenience.</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()

          }
          // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
        >

          Try again
        </button>
      </div>
    </div>
  )
}