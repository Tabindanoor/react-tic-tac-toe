import React, { useState } from 'react';

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

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="status my-4 text-2xl bg-slate-600">{status}</div>
      <div className="board grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <div className="board-row" key={i}>
              {renderSquare(i)}
            </div>
          );
        })}
      </div>
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
