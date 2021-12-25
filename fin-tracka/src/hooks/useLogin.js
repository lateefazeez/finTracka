import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { finTrackaAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async(email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // sign user out
      const response = await finTrackaAuth.signInWithEmailAndPassword(email, password)

      // dispatch the login action
      dispatch({ type: "LOGIN", payload: response.user})

      // check if component has unmount for state update
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

  return { error, isPending, login}

}