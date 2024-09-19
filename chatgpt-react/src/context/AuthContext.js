import { createContext, useContext, useEffect, useState} from 'react'
import { auth, provider } from '../firebase/config'
import { signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loginWihGoogle = () => signInWithPopup(auth, provider)
  const logout = () => signOut(auth)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    loginWihGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



export default AuthContext