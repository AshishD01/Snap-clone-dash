import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import {auth,provider } from './firebase';
import './Login.css';

function Login() {
 const dispatch=useDispatch();
const signIn=()=>{
auth.signInWithPopup(provider).then(result =>{
    dispatch(login({
        username:result.user.displayName,
        profilePic:result.user.photoURL,
        id:result.user.uid,
    }))
}).catch((error)=>alert(error.message));
};

  return <div className="login">
<div className="login__container">
    <img src ="https://media.wired.com/photos/5955b319ad90646d424bb3d3/master/pass/snapchat-ghost.jpg" alt=""/>
    <Button variant="outlined" onClick={signIn}>
        Sign in
    </Button>
</div>

  </div>
  
}

export default Login;
