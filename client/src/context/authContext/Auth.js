import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth: auth, setAuth: setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}