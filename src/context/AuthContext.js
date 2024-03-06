import React, {createContext, useContext, useState, useEffect} from 'react';
import api from '../axios/api';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [ userInfo, setUserInfo ] = useState({
    sessionId: "",
    name: "",
    email: ""
  });

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("user/getUser");
      setUserInfo({
        sessionId: response.data.sessionID, 
        name: response.data.userExist.name, 
        email: response.data.userExist.email
      });
    }
    catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  },[userInfo.sessionId]);

  return (
    <div>
      <AuthContext.Provider value = {{userInfo, setUserInfo}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context){
    throw new Error("Auth Context Not SetUp Properly");
  }
  return context;
}
