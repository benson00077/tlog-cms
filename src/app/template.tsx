"use client"
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

/** Workaround as proteced rotues, because I want static export which does not support Middleware */
//FIXME: case when jwt expired
function Template({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  const isJwtExpired = (token: string) => {
    // Decode the JWT to access its claims (header, payload, and signature)
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime
  }

  useLayoutEffect(() => {
    const jwt = window.localStorage.getItem('token')
    if (!jwt) {
      const loginRoute = "/"
      router.push(loginRoute)
      return
    }

    if (isJwtExpired(jwt)) {
      const loginRoute = "/"
      router.push(loginRoute)
      return
    }
  })

  return (
    <>
      {children}
    </>
  )
}

export default Template