import React from 'react';
import api from '../axios/api';
import { useAuthContext } from '../context/AuthContext';

const Logout = () => {

  const { setUserInfo } = useAuthContext();

  const logOutHandler = async () => {
    try  {
      await api.get("logout");
      setUserInfo({
        name: "",
        email: "",
        sessionId: ""
      });
    } catch (err){
      console.log("some error occured at logout", err);
    }
  }

  return (
    <div>
      <button onClick={logOutHandler}>
        Logout
      </button>
    </div>
  )
}

export default Logout
