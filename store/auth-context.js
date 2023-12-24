import { createContext } from 'react';

const AuthContext = createContext({
   loggedInUserInfo: {},
   authKey: '',
   setLoggedInUSerInfo: (user) => {},
   setAuthKey: (key) => {}
})

export default AuthContext;
