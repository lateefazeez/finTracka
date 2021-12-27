import { useEffect, useRef, useState } from "react"
import { finTrackaFirestore } from "../firebase/config"


export const useCollection = (collection, _query) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // useRef is used because the query dependency is an array, 
  // it would be seen as a different dependency each time the 
  // component unmounts, and would therefore cause infinite loop

  // query is an array and would be different on every function call

  const query = useRef(_query).current

  useEffect(() => {
    let dbRef = finTrackaFirestore.collection(collection)
    
    if (query) {
      dbRef = dbRef.where(...query)
    }

    const unsubscribe = dbRef.onSnapshot((snapshot) => {
      let results = []

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setError(null)
      setDocuments(results)
    }, (error) => {
      setError("Not able to fetch data")

    })

    return () => unsubscribe()
  }, [collection, query])

  return { documents, error }
}