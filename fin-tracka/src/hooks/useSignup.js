import { useState } from "react"
import { finTrackaAuth } from "../firebase/config"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async(email, password, displayName) => {
    setError(null)
    setIsPending(true)
    try {
      const response = await finTrackaAuth.createUserWithEmailAndPassword(email, password)
      console.log(response.user)
  
      if(!response) {
        throw new Error("Could nmot complete user signup")
      }

      await response.user.updateProfile({ displayName })

      setIsPending(false)
      setError(null)
    }
    catch (err){
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
    


  }

  return { error, isPending, signup }
}