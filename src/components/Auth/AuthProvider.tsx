import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

/* Context Provider */
export function AuthProvider({ children }: { children: ReactNode }) {

  /* jwt sotred in-memory : token stored in state */
  /* jwt stored in local storage: state for notifying React re-render */
  /**
   * NOTICE: Dont exposes this state out to App.tsx. see function getStoredToken
   */
  const [isLocalStorageToken, setIsLocalStorageToken] = useState(false);

  const handleLogin = (access_token: string, _id: string) => {

    window.localStorage.setItem('token', access_token)
    window.localStorage.setItem('userId', _id)
    setIsLocalStorageToken(true)
  }

  const handleLogout = () => {
    /**
     *  Prevent user go back to last page after logout w/ context state logic :
     *  if (!getStoredToken()) { // proteced page's <Route> unmounted }
     */
    window.localStorage.clear()
    setIsLocalStorageToken(false)
  }

  const getStoredToken = () => {
    /**
     *  Only true main source exposes to App.tsx's <Route> mount/unmount logic for auth/protected pages.
     *    Using state isLocalStorageToken as <Route> unmount/mount logic would casue
     *    Problem: refresh page on login state but redirected back to login page.
     *    Sicne state isLocalStorageToken is set back to default false when refreshing page.
     */
    const token = window.localStorage.getItem('token')
    if (token) setIsLocalStorageToken(true)
    return token
  }

  const value = {
    handleLogin,
    handleLogout,
    getStoredToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

