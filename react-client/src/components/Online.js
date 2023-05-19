import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import socket from '../connection/Socket';
import {useNavigate} from "react-router-dom";


export default function Online() {
    const navigate = useNavigate();
    const [waiting,setWaiting]=useState(false);
    const [warning,setWarning]=useState(false);
    const [generatedRoomId, setGeneratedRoomId] = useState(localStorage.getItem('generatedRoomId') || '');
    const [enteredID,setEnteredID]=useState("");
    const handleGenerateClick = async (e) => {
        // e.preventDefault();
        if(generatedRoomId===""){
            try {
                const response = await axios.get('https://tic-tac-toe-v2z1.onrender.com/api/generateRoom');
                const roomId = response.data.roomId;
                setGeneratedRoomId(roomId);
                localStorage.setItem('generatedRoomId', roomId);
            } catch (error) {
                console.log('Error generating room ID:');
            }
            
        }
    };
    const handleExitRoom=(event)=>{
        localStorage.removeItem('generatedRoomId');
    }
    const handleEnteredID=(event)=>{
        event.preventDefault();
        try{
            if(enteredID==="" || enteredID.includes(" "))return;
        } catch(error){
            console.log(error);
            return;
        }
        let key;
        socket.emit('getRoomsData',enteredID);
        socket.on('roomsData', (rooms,size) => {
            key=[...rooms];
            console.log('Rooms:', rooms);
            console.log(size);
            if(!key.includes(enteredID)){
                setWarning(true);
                return;
            }
            else if(size<=2)socket.emit("joinroom",enteredID);
            else setWarning(true);

            if(size===1)
            {
                setWaiting(true);
            }
            else if(size===2)socket.emit("waitingover",enteredID);
            
        });
        socket.on("joinRoomSuccess",(roomId)=>{
            console.log("success");
        })
        socket.on("joinRoomFailure",(roomId)=>{
            console.log("fail");
        })
    }
    useEffect(()=>{
        socket.on("navigateToWaitingPage",(player,Room)=>{
            navigate("/startgamepage",{ state: { Turn: player,id:socket.id,room:Room}});
        })
        setWarning(false);
        setWaiting(false);
    },[navigate]);
    

return (
    <div className="container " style={{height:"80vh",width:"50vw"}}>
        <div className="row justify-content-center flex" style={{height:"100%",width:`${window.innerWidth<900?"68vw":"100%"}`,alignItems:"center"}}>
            <div className='d-flex row justify-content-center flex-wrap' style={{color:"turquoise",alignItems:"center"}}>{waiting?"Waiting for the opponent to join...":""}</div>
            <div className="col-md-6">
                <form className='d-flex row justify-content-center ' style={{alignItems:"center"}}>
            <div className="form-group">
                <label style={{color:"cyan"}}>Generate Room ID</label>
                <div className="form-control " id="exampleInputEmail1" style={{height:"40px",fontWeight:"bold"}}>
                    {generatedRoomId}
                </div>
            </div>
            <div>

            <button type="submit" className="btn btn-secondary w-50 " onClick={handleGenerateClick} style={{marginTop:"25px"}}>Generate Room</button>
            <button type="submit" className="btn btn-danger w-30 " onClick={handleExitRoom} style={{marginTop:"25px",float:"right"}}>Exit room</button>
            </div>
            <div className="form-group" style={{marginTop:"20px"}}>
                <label style={{color:"cyan"}}>Enter Room ID</label>
                <input  className="form-control" type='text' onChange={(e)=>{setEnteredID(e.target.value)}} style={{fontWeight:"bold"}} id="exampleInputPassword1" placeholder="Enter Room ID"/>
            </div>
            <button className="btn btn-success w-50" onClick={handleEnteredID} style={{marginTop:"25px"}}>Join</button>
            <h3 className="flex row justify-content-center  mb-3" style={{color:`${warning?"red":""}`,padding:"2px",height:"2px",fontSize:"10px",margin:"0px",marginTop:"10px",alignItems:"center"}}>Please Enter Valid Room ID</h3>
            </form>
            </div>
        </div>
    </div>
)
}
