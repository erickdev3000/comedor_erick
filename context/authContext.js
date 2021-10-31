import { createContext, useState, useEffect } from "react";
import useLocalStorage from './../hooks/useLocalStorage'
import {useRouter} from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const [session, setSession] = useState(() => useLocalStorage.getLocalStorage("session", ''))
    const [error, setError] = useState(null)

    useEffect(() => {
        useLocalStorage.setLocalStorage("session", session);
      }, [session]);

    const quitSession = async() => {
        setSession('')
        router.replace('/');
      };

    return (
        <AuthContext.Provider value={{session, setSession, quitSession, error}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext