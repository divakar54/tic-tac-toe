import { useState } from 'react';
import './App.css';
const X_PLAYER = "X"
const O_PLAYER = "O"

const TicToeBoard = ({board, player, onPlayerMove, disableAll}) => {

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
        <td>{square(9)}</td>
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
        disableAll: true,
        gamefinished: true
      }
    }
  }

  return {
   winnerAny: null,
   disableAll: false,
   gamefinished: false
  }
}
const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null];
function App() {

  const [board, setBoard] = useState(INITIAL_BOARD);
  const [bool, setBool] = useState(false);
  const [player, setPlayer] = useState(X_PLAYER);
  const {winnerAny, disableAll, gamefinished} = analyseBoard(board);

  const onPlayerMove = i => {
      const nextBoard = board.slice();
      nextBoard[i] = player;
      setBoard(nextBoard);
      if(bool){
        setPlayer(X_PLAYER);
      }
      else{
        setPlayer(O_PLAYER);
      }
      setBool(!bool);
  }
  console.log(gamefinished)
  if(gamefinished){
    console.log(winnerAny);
  }
  return (
    <div className="App">
      <section>
        <h1 className="game--title">Tic Tac Toe</h1>
        <div className="game--container">
          <TicToeBoard {...{player, board, onPlayerMove, disableAll}} />
        </div>
        <h2 className="game--status">
          {
            gamefinished ?
              <span>Game has finished and won by {winnerAny}</span>
              :
              <span>Active </span>
          }
        </h2>
        <button className="game--restart">Restart Game</button>
    </section>
    </div>
  );
}

export default App;
