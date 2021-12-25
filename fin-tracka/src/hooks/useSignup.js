import { useEffect, useState } from "react"
import { finTrackaAuth } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()


  const signup = async(email, password, displayName) => {
    
    
    setError(null)
    setIsPending(true)
    try {
      // signup
      const response = await finTrackaAuth.createUserWithEmailAndPassword(email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })
  
      // check for response
      if(!response) {
        throw new Error("Could nmot complete user signup")
      }

      // add display name to user
      await response.user.updateProfile({ displayName })

      // check if component has unmount
      if(!isCancelled) {
        setIsPending(false)
        setError(null)
      }
      
    }
    catch (err){
      if(!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
      
    }
  }

  // cleanup
  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return { error, isPending, signup }
}