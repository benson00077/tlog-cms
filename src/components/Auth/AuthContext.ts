import { createContext } from "react";

/* Create Context */
export const AuthContext = createContext({} as {
  handleLogin: (access_token: string, _id: string) => void,
  handleLogout: () => void,
  getStoredToken: () => string | null,
});
