import { useState } from 'react';
import './App.css';
const X_PLAYER = "X"
const O_PLAYER = "O"

const TicToeBoard = ({board, onPlayerMove, disableAll}) => {

  const square = i => {
    let player = board[i];
    return(
      <button onClick={() => onPlayerMove(i)} style={{fontSize:'50px', width:'75px', height: '75px'}} disabled={disableAll || player ? true : false} >
        {player ? player : "."}
      </button>
    ) 
  }

  return(<table>
    <tbody>
      <tr>
        <td>{square(0)}</td>
        <td>{square(1)}</td>
        <td>{square(2)}</td>
      </tr>
      <tr>
        <td>{square(3)}</td>
        <td>{square(4)}</td>
        <td>{square(5)}</td>
      </tr>
      <tr>
        <td>{square(6)}</td>
        <td>{square(7)}</td>
        <td>{square(8)}</td>
      </tr>
    </tbody>
  </table>)
}

const STREAKS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const analyseBoard = board => {

  for(const streak of STREAKS){
    const [a,b,c] = streak.map(i => board[i])
    if(a !== null && a===b && b===c){
      return {
        winnerAny : a,
        gamefinished: true,
        playerToMove: null
      }
    }
  }

  const occupiedCellsLength = board.filter(x => x!==null).length
  
  if(occupiedCellsLength === board.length){
    return {
      winnerAny: null,
      gamefinished: true,
      playerToMove: null
    }
  }

  const playerToMove = occupiedCellsLength % 2 === 0 ? X_PLAYER : O_PLAYER;
  return{
    winnerAny: null,
    gamefinished: false,
    playerToMove
  }
}
const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null];
function App() {

  const [board, setBoard] = useState(INITIAL_BOARD);
  const [boardSnapshot, setBoardSnapShot] = useState([INITIAL_BOARD]);

  const {winnerAny,gamefinished, playerToMove} = analyseBoard(board);

  const onPlayerMove = i => {
      const nextBoard = board.slice();
      nextBoard[i] = playerToMove;
      setBoard([...nextBoard]);
  }

  const handleRestartGame = () => {
    setBoard(INITIAL_BOARD);
    setBoardSnapShot([INITIAL_BOARD]);
  }
  
  let boardStatus = `it is ${playerToMove} turn`;
  if(gamefinished){
    boardStatus = winnerAny ? `Game is won by ${winnerAny}` : "Nobody Won!!";
  }
  return (
    <div className="App">
      <section>
        <h1 className="game--title">Tic Tac Toe</h1>
        
        <div className="game--container">
          <TicToeBoard {...{board, onPlayerMove, disableAll:gamefinished}} />
        </div>
        <h2 className="game--status">
          {
           boardStatus
          }
        </h2>
        <button className="game--restart" onClick={handleRestartGame}>Restart Game</button>
    </section>
    </div>
  );
}

export default App;
