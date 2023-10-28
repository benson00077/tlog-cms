'use client';

import { useReducer, useEffect, createContext, useContext, useState } from 'react';
import { jwtRetrive } from './utils';

const AuthContext = createContext({} as { jwt: string, setJwt: (token: string) => void })

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const [jwt, setJwt] = useState('')

  // Check if user is already logged in from a previous page reload
  useEffect(() => {
    if (!localStorage.getItem('token')) return
    const token = jwtRetrive()
    setJwt(token)
  }, [])

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)