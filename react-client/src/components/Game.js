import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp} from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { faO } from '@fortawesome/free-solid-svg-icons';



export default function Game(props) {
    const [scores,setScores]=useState([0,0,0]);
    const [gameStatus,setStatus]=useState(["inprogress",true]);
    const [isUp, setIsUp] = useState(false);
    const [player,setPlayer]=useState(true);
    const [playerCounter,setCounter]=useState([0,0]);
    const [board,setWinBoard]=useState([[0,0,0],[0,0,0],[0,0,0]]);
    const playerClick = (event) => {
        const i=event.target.id-1;
        const r=Math.floor(i/3);
        const c=i%3;
        if(board[r][c]===0 && gameStatus[1])
        {
            const counter=[...playerCounter];
            const winBoard=[...board];
            winBoard[r][c]=player?1:2;
            setWinBoard(winBoard);
            counter[player?0:1]++;
            setCounter(counter);
            if(counter[player?1:0])
            {
                if(winningCheck(player?1:2,r,c)){
                    const s=[...scores];
                    if(player)s[0]++;
                    else s[2]++;
                    setScores(s);
                    setStatus([player?"Player 1 Wins!":"Player 2 Wins!"],false);
                }
                else if(counter[0]+counter[1]===9)
                {
                    setStatus(["Its is a TIE!!!",false]);
                    const s1 =[...scores];
                    s1[1]++;
                    setScores(s1);
                }
            }
            setPlayer(!player);
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
    const handleClick = () => {
        setIsUp(!isUp);
    }
    const handleRound = () => {
        setStatus(["inprogress",true]);
        setPlayer(true);
        setCounter([0,0]);
        setWinBoard([[0,0,0],[0,0,0],[0,0,0]]);
    }
    const handleReset = () => {
        handleRound();
        setScores([0,0,0]);
    }
    return (
        <div className='srihari2'>
            <main>
                <div className="grid">
                    <div className="top">
                        <FontAwesomeIcon icon={player ? faTimes:faO} className={`${player?"turquoise":""} icon `} size='2x'/>
                        <p className={`text ${player?"":"turquoise"}`}>{player?"Player1":"Player2"}</p>
                    </div>
                    <div className="menu" data-id="menu">
                        <button className="menu-btn" data-id="menu-btn" onClick={handleClick}>
                            Actions
                            <FontAwesomeIcon icon={isUp ? faChevronUp:faChevronDown} />
                        </button>
                        <div className = {`items border ${isUp ? "" : "hidden"}`} data-id="menu-items">
                            <button onClick={handleReset} data-id="reset-btn">Reset</button>
                            <button onClick={handleRound} data-id="new-round-btn">New Round</button>
                        </div>
                    </div>
                    <div id='1' onClick={playerClick} className="square shadow">
                        <FontAwesomeIcon icon={board[0][0]===1? faTimes:faO} className={`${board[0][0]===1?"turquoise":"yellow"} icon ${board[0][0]===0?"hidden":null}`}/></div>
                    <div id='2' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[0][1]===1? faTimes:faO} className={`${board[0][1]===1?"turquoise":"yellow"} icon ${board[0][1]===0?"hidden":null}`}/>
                    </div>
                    <div id='3' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[0][2]===1? faTimes:faO} className={`${board[0][2]===1?"turquoise":"yellow"} icon ${board[0][2]===0?"hidden":null}`}/>
                    </div>
                    <div id='4' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][0]===1 ? faTimes:faO} className={`${board[1][0]===1?"turquoise":"yellow"} icon ${board[1][0]===0?"hidden":null}`}/>
                    </div>
                    <div id='5' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][1]===1 ? faTimes:faO} className={`${board[1][1]===1?"turquoise":"yellow"} icon ${board[1][1]===0?"hidden":null}`}/>
                    </div>
                    <div id='6' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[1][2]===1? faTimes:faO} className={`${board[1][2]===1?"turquoise":"yellow"} icon ${board[1][2]===0?"hidden":null}`}/>
                    </div>
                    <div id='7' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][0]===1? faTimes:faO} className={`${board[2][0]===1?"turquoise":"yellow"} icon ${board[2][0]===0?"hidden":null}`}/>
                    </div>
                    <div id='8' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][1]===1? faTimes:faO} className={`${board[2][1]===1?"turquoise":"yellow"} icon ${board[2][1]===0?"hidden":null}`}/>
                    </div>
                    <div id='9' onClick={playerClick} className="square shadow">
                    <FontAwesomeIcon icon={board[2][2]===1 ? faTimes:faO} className={`${board[2][2]===1?"turquoise":"yellow"} icon ${board[2][2]===0?"hidden":null}`}/>
                    </div>
                    <div className="score shadow box-1">
                        <p>Player 1</p>
                        <span data-id="p1-wins">{`${scores[0]}`} Wins</span>
                    </div>
                    <div className="score shadow box-2 btn-bold">
                        <p>Ties</p>
                        <span data-id="ties">{`${scores[1]}`}</span>
                    </div>
                    <div className="score shadow box3 btn-bold">
                        <p>Player 2</p>
                        <span data-id="p2-wins">{`${scores[2]}`} Wins</span>
                    </div>
                </div>
            </main>
            <div className={`modal ${gameStatus[1]?"hidden":""}`} data-id="modal">
                <div className="modal-contents">
                    <p data-id="modal-text">{gameStatus[0]}</p>
                    <button onClick={handleRound} data-id="modal-btn">Play again</button>
                </div>
            </div>
    </div>
    )
}