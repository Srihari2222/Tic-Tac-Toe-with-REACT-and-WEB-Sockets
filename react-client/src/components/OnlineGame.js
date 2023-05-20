import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { faO } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import socket from '../connection/Socket';

export default function OnlineGame() {
    const location = useLocation();
    const PlayersTurn = location.state?.Turn;
    const ID=location.state?.id;
    const Room=location.state?.room;
    const [turn,setTurn]=useState(PlayersTurn[0]===ID);
    console.log(turn);
    const [shouldEmit,setShouldEmit]=useState(false);
    const [scores,setScores]=useState({[PlayersTurn[0]]:0,[PlayersTurn[1]]:0,'ties':0});
    const [gameStatus,setStatus]=useState(["inprogress",true]);
    const [playerCounter,setCounter]=useState({[PlayersTurn[0]]:0,[PlayersTurn[1]]:0});
    const [board,setWinBoard]=useState([[null,null,null],[null,null,null],[null,null,null]]);


    const emitGameState = () => {
        if(shouldEmit){
            const gameState = {
                board,
                scores,
                gameStatus,
                playerCounter,
            }
            socket.emit("changes",gameState,Room,ID);
            setShouldEmit(true);
        }

    }
    useEffect(()=>{
        socket.on("updates",(gameState,Room,opp)=>{
            if(opp!==ID)
            {
                setWinBoard(gameState.board);
                setCounter(gameState.playerCounter);
                setScores(gameState.scores);
                setStatus(gameState.gameStatus);
                setTurn(true);
                setShouldEmit(false);
            }
        });
    },[]);
    useEffect(()=>{
        emitGameState();
    },[shouldEmit]);
    const playerClick = async(event) => {
        if(turn===false)return;
        const i=event.target.id-1;
        const r=Math.floor(i/3);
        const c=i%3;
        if(r>=0 && c>=0 && board[r][c]===null && gameStatus[1])
        {
            const counter={...playerCounter};
            const winBoard=[...board];
            winBoard[r][c]=ID;
            setWinBoard(winBoard);
            counter[ID]++;
            console.log("This is counter:"+" "+counter[ID]);
            setCounter(counter);
            if(winningCheck(ID,r,c)){
                const s={...scores};
                s[ID]++;
                setScores(s);
                setStatus([ID,false]);
            }
            else if(counter[Object.keys(counter)[0]]+counter[Object.keys(counter)[1]]===9)
            {
                console.log("tie");
                setStatus(["Its is a TIE!!!",false]);
                const s1 ={...scores};
                s1['ties']++;
                setScores(s1);
            }
            setTurn(!turn);
            setShouldEmit(true);
        }
    }
    const winningCheck = (choice,row,col) => {
        if(board[row][0]===choice && board[row][1]===choice && board[row][2]===choice)return true;
        if(board[0][col]===choice && board[1][col]===choice && board[2][col]===choice)return true;
        let temp=0,temp1=0;
        for(let i=0;i<3;i++)
        {
            if(board[i][i]===choice)temp++;
            if(board[i][3-i-1]===choice)temp1++;
        }
        return(temp===3 || temp1===3);

    }
    const handleRound = () => {
        setStatus(["inprogress",true]);
        setTurn(PlayersTurn[0]===ID);
        setCounter({[PlayersTurn[0]]:0,[PlayersTurn[1]]:0});
        setWinBoard([[null,null,null],[null,null,null],[null,null,null]]);
        setShouldEmit(false);
    }
    return (
        <div className='srihari2' style={{height:`${window.innerWidth<800?"80vh":""}`}}>
            <main>
                <div className="grid">
                    <div className="top">
                        <FontAwesomeIcon icon={PlayersTurn[0]===ID ? faTimes:faO} className={`${PlayersTurn[0]===ID?"turquoise":""} icon `} size='2x'/>
                        <p className={`text ${PlayersTurn[0]===ID?"":"turquoise"}`}>{turn?"You":"Opponent"}</p>
                    </div>
                    <div className="menu" data-id="menu">
                    </div>
                    <div id='1' onClick={playerClick} className="square shadow">
                        <FontAwesomeIcon icon={board[0][0]===PlayersTurn[0]? faTimes:faO} className={`${board[0][0]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[0][0]===null?"hidden":null}`}/></div>
                    <div id='2' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[0][1]===PlayersTurn[0]? faTimes:faO} className={`${board[0][1]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[0][1]===null?"hidden":null}`}/>
                    </div>
                    <div id='3' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[0][2]===PlayersTurn[0]? faTimes:faO} className={`${board[0][2]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[0][2]===null?"hidden":null}`}/>
                    </div>
                    <div id='4' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][0]===PlayersTurn[0] ? faTimes:faO} className={`${board[1][0]===PlayersTurn[0] ?"turquoise":"yellow"} icon ${board[1][0]===null?"hidden":null}`}/>
                    </div>
                    <div id='5' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][1]===PlayersTurn[0] ? faTimes:faO} className={`${board[1][1]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[1][1]===null?"hidden":null}`}/>
                    </div>
                    <div id='6' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][2]===PlayersTurn[0]? faTimes:faO} className={`${board[1][2]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[1][2]===null?"hidden":null}`}/>
                    </div>
                    <div id='7' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][0]===PlayersTurn[0]? faTimes:faO} className={`${board[2][0]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[2][0]===null?"hidden":null}`}/>
                    </div>
                    <div id='8' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][1]===PlayersTurn[0]? faTimes:faO} className={`${board[2][1]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[2][1]===null?"hidden":null}`}/>
                    </div>
                    <div id='9' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][2]===PlayersTurn[0] ? faTimes:faO} className={`${board[2][2]===PlayersTurn[0]?"turquoise":"yellow"} icon ${board[2][2]===null?"hidden":null}`}/>
                    </div>
                    <div className="score shadow box-1">
                        <p>You</p>
                        <span data-id="p1-wins">{`${scores[ID]}`} Wins</span>
                    </div>
                    <div className="score shadow box-2 btn-bold">
                        <p>Ties</p>
                        <span data-id="ties">{`${scores['ties']}`}</span>
                    </div>
                    <div className="score shadow box3 btn-bold">
                        <p>Opponent</p>
                        <span data-id="p2-wins">{`${scores[Object.keys(scores)[0]===ID?PlayersTurn[1]:PlayersTurn[0]]}`} Wins</span>
                    </div>
                </div>
            </main>
            <div className={`modal ${gameStatus[1]?"hidden":""}`} data-id="modal">
                <div className="modal-contents">
                    <p data-id="modal-text">{gameStatus[0]==="Its is a TIE!!!"?gameStatus[0]:(gameStatus[0]===ID?"You Won":"You Lost")}</p>
                    <button onClick={handleRound} data-id="modal-btn">Play again</button>
                </div>
            </div>
    </div>
    )
}