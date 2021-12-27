import { useState, useReducer, useEffect } from "react"
import { finTrackaFirestore, timestamp } from "../firebase/config"

let initialState = {
  isPending : "false",
  document: null,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch(action.type) {
    case "IS_PENDING":
      return { document: null, error: null, success: false, isPending: true }
    case "ADDED_DOCUMENT":
      return { isPending: false, document: action.payload, error: null, success: true }
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, error: null, success: true}
    case "ERROR":
      return { isPending: false, document: null, error: action.payload, success: false }
    default:
      return state
  }


}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection reference
  const dbRef = finTrackaFirestore.collection(collection)

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async(doc) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await dbRef.add({...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })

    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }   
    
  }

  // delete a document
  const deleteDocument = async(id) => {
    dispatch({ type: "IS_PENDING" })

    try {
      await dbRef.doc(id).delete()
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
    } catch(error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message})
    }
    
  }

  // cleanup
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}