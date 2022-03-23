import { useContext } from "react"
import { AuthContext } from "./AuthContext";

/* custom hook for AuthContext */
export const useAuth = () => {
  return useContext(AuthContext)
}