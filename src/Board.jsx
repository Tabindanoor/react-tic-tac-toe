
import React, { useState } from 'react';
import './Board.css'

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const renderSquare = (i) => {
    return (
      <button
        className={`square ${squares[i] ? 'bg-gray-300' : ''} ${
          winner && squares[i] === winner ? 'bg-green-400' : ''
        }`}
        onClick={() => handleClick(i)}
        disabled={squares[i] || winner}
        key={i}
      >
        {squares[i]}
      </button>
    );
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = 'Draw! Play again';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="status my-4 text-2xl text-emerald-500 font-serif font-semibold">{status}</div>
      <div className="board grid grid-cols-3 gap-2 ">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <div className="board-row  text-2xl" key={i}>
              {renderSquare(i)}
            </div>
          );
        })}
      </div>

      <button onClick={resetGame} className="btn-reset mt-4 bg-green-400 rounded-lg p-3">Reset Game</button>
  
  
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;

