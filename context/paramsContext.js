import { createContext, useState, useEffect } from "react";
import useLocalStorage from './../hooks/useLocalStorage'
import {useRouter} from 'next/router'

const ParamsContext = createContext()

export const ParamsProvider = ({children}) => {
    const router = useRouter()
    const [params, setParams] = useState(() => useLocalStorage.getLocalStorage("params", ''))
    const [error, setError] = useState(null)

    useEffect(() => {
        useLocalStorage.setLocalStorage("params", params);
      }, [params]);

    const quitParams = async() => {
        setSession('')
        router.replace('/');
      };

    return (
        <ParamsContext.Provider value={{params, setParams, quitParams, error}}>
            {children}
        </ParamsContext.Provider>
    )
}

export default ParamsContext