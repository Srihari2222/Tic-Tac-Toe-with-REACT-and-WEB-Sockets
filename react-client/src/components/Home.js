import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./computer.css"



export default function Home(props) {
    const navigate=useNavigate();
    const handleComputer=() =>{
        navigate("/playwithcomputer");
    }
    const handleFriend =() =>{
        navigate("/playwithfriend");
    }
    const handleOnline=()=>{
        navigate("/playonline");
    }
    return (
        <>
        <div className='computer'>
            <div className="computer-div1"><h1>Tic Tac Toe Game</h1></div>
            <div className='computer-img'>
            <div className='img'>
                <img className='fit-img'
                src={require('./images/TicTacToe.png')}
                alt="Tic Tac Toe banner"/>
            </div>
            <div className='double'>
                <button onClick={handleComputer} type="button" className="btn btn-success btn-lg play-computer" style={{height:"100px"}}>Play With Computer</button>
                <button onClick={handleFriend} type="button" className="btn btn-success btn-lg play-computer" style={{height:"100px"}}>Play With offlie Friend</button>
                <button type="button" onClick={handleOnline} className="btn btn-success btn-lg play-computer" style={{height:"100px"}}>Play online</button>
            </div>
            </div>
        </div>
        </>
    )
}
