import React, {useEffect, useState} from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import api from '../axios/api';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {userInfo, setUserInfo} = useAuthContext();

  useEffect(() => {
    if (userInfo.sessionId){
      navigate("/dashboard");
    }
  },[userInfo.sessionId])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("logIn", {email, password});
      setUserInfo({...userInfo, sessionId: response.data.sessionId})
      navigate("/dashboard");
      console.log("checking data", response);
    }
    catch (err){
      console.log(err, "some error occured at login");
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input 
          required
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
        <input 
          required
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <button>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
