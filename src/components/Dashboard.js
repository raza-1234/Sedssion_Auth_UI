import React, {useEffect} from 'react'
import { useAuthContext } from '../context/AuthContext';
import Logout from "./Logout";
import { useNavigate } from 'react-router';

const Dashboard = () => {

  const navigate = useNavigate(); 
  const { userInfo } = useAuthContext();

  useEffect(() => {
    if (!userInfo.sessionId){
      navigate("/");
    }
  }, [userInfo.sessionId])

  return (
    <div>
      <h1>
        Hey {userInfo.name}! Welcome To Dashboard
      </h1>
      <Logout/>
    </div>
  )
}

export default Dashboard
