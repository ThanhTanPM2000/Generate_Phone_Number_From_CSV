import { createContext } from "react"
import { Me } from "../types"
import { useCookies } from "react-cookie";

export const AuthContext = createContext<Me | null>(null);

type ChildrenProps = {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [cookies] = useCookies(["me"])
  const me = cookies.me
  console.log({
    me
  })

  return <AuthContext.Provider value={me} >
    {children}
  </AuthContext.Provider>
}


