import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";
import Preview from './Preview';
import Chats from './Chats';
import { login,logout} from './features/appSlice';
import ChatView from './ChatView';
import Login from './Login';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch=useDispatch();

useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>
  {
    if(authUser){
      dispatch(
        login(
          {
            username:authUser.displayName,
            profilePic:authUser.photoURL,
            id:authUser.uid,
          }
        )
      );
    } else {
      dispatch(logout());
    }
  })
})
  return (
    <div className="app">
     <Router>
       {!user ?(
         <Login/>
       ):(
        <div className="app__body">
        <Switch>
        <Route exact path="/chats/view">
          <ChatView/>
          </Route>
        <Route exact path="/chats">
          <Chats/>
          </Route>
        <Route exact path="/preview">
          <Preview/>
          </Route>
          <Route exact path="/">
          <WebcamCapture />
          </Route>
        </Switch>
      </div>
       )}
     
    </Router>
     
    </div>
  );
}

export default App;
