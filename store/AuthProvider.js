import AuthContext from "./auth-context";
import { useState, useContext } from 'react';

const AuthProvider = ({children}) => {
    const [loggedInUserInfo, setLoggedInUSerInfo] = useState({});
    const [authKey, setAuthKey] = useState('')

    const value = {
        loggedInUserInfo,
        setLoggedInUSerInfo,
        authKey,
        setAuthKey
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;

const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    return authContext;
}

export { useAuthContext }