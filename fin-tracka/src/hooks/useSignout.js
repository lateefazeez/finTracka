import { useState } from "react/cjs/react.development"
import { finTrackaAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useSignout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signout = async() => {
    setError(null)
    setIsPending(true)

    try {
      // sign user out
      await finTrackaAuth.signOut()

      // dispatch the logout action
      dispatch({ type: "LOGOUT" })

    } catch (err) {
      throw new Error("Signout Failed")
    }
  }

  return { error, isPending, signout}

}