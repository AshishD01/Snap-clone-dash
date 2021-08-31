import React, { useEffect } from "react";
import {selectCameraImage,resetCameraImage} from "./features/cameraSlice";
import {useDispatch, useSelector} from "react-redux";
import "./Preview.css";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import  TextFieldsIcon  from "@material-ui/icons/TextFields";
import  CreateIcon  from "@material-ui/icons/Create";
import  NoteIcon  from "@material-ui/icons/Note";
import  MusicNoteIcon  from "@material-ui/icons/MusicNote";
import  CropIcon  from "@material-ui/icons/Crop";
import  TimerIcon  from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uid} from "uuid";
import { db, storage } from "./firebase.js";


function Preview(){
    const cameraImage= useSelector(selectCameraImage);
    const history =useHistory()
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if (!cameraImage){
      history.replace('/');
        }
    },[cameraImage,history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace("/");
    }
   
    const sendPost=() =>{
       const id=uid();
       const uplaodTask= storage.ref(`posts/${id}`).putString(cameraImage,"data_url");

       uplaodTask.on('state_changed',null,(error)=>{
           console.log(error) },async()=>
   {
       await storage.ref('posts').child(id).getDownloadURL().then(url=>{
        //    db.collection('posts')  ({
        //         imageURL:url,
        //         username:'dogo',
        //         read :false,
        //         timestamp : firebase.firestore.FieldValue.serverTimeStamp()
        //     });
        //     history.replace("/chats");
      try{  let ref = db.collection('posts')
        console.log(ref);
        ref.doc(`${id}`).set({ 
            imagerUrL:url,
            username:'dogo',
            read :false,
            timestamp : new Date()
        });
        history.replace("/chats");
    }
        catch(error){
            console.log(error);
        }
        
        }) ;

    });
    };


    return <div className="preview">
        <CloseIcon onClick={closePreview} className='preview__close' />
       <div className="preview__toolbarRight">
           <TextFieldsIcon/>
           <CreateIcon/>
           <NoteIcon/>
           <MusicNoteIcon/>
           <CropIcon/>
           <TimerIcon/>
       </div>
        <img src = {cameraImage} alt="" />

        <div onClick={sendPost} className= "preview__footer">
            <h2>send now</h2>
            <SendIcon fontSize="small" className = 'preview__sendIcon'/>
        </div>


    </div>
}

export default Preview;