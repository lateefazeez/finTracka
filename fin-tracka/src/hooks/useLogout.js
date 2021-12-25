import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { finTrackaAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async() => {
    setError(null)
    setIsPending(true)

    try {
      // sign user out
      await finTrackaAuth.signOut()

      // dispatch the logout action
      dispatch({ type: "LOGOUT" })

      // check if component has unmount
      if(!isCancelled) {
        setIsPending(false)
        setError(null)
      }

    } catch (err) {
      
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return { error, isPending, logout}

}