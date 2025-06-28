import { useState } from 'react';
import './Board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || squares[index]) return;

    const updatedSquares = [...squares];
    updatedSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(updatedSquares);
    setXIsNext(!xIsNext);

    const winnerFound = calculateWinner(updatedSquares);
    if (winnerFound) setWinner(winnerFound);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winner && isPartOfWinningLine(squares, i);

    return (
      <button
        key={i}
        onClick={() => handleClick(i)}
        disabled={squares[i] || winner}
        className={`sm:w-24 sm:h-24 h-20  w-20 text-3xl font-bold rounded-lg transition-all duration-200 shadow 
          ${
            isWinningSquare
              ? 'bg-green-400 text-white'
              : squares[i]
              ? 'bg-gray-300 text-black'
              : 'bg-white hover:bg-gray-200'
          }`}
      >
        {squares[i]}
      </button>
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? 'Draw! Play again'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
  <div className="min-h-screen flex items-center justify-center  p-4">
    <div className="rounded-2xl p-8 w-full max-w-md text-center space-y-6 border border-[#00f7ff]  bg-gray-950 text-white">
      <div className={`text-3xl font-bold font-mono ${winner ? 'text-[#00f7ff] animate-pulse drop-shadow-lg' : 'text-emerald-400'}`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-4 justify-center">
        {squares.map((_, i) => renderSquare(i))}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-[#00f7ff] to-[#4efcbf] text-black font-semibold rounded-lg shadow-lg hover:shadow-[0_0_15px_#00f7ff] transition-all duration-300"
      >
        🔁 Reset Game
      </button>

      <div className="z-20">
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </div>
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isPartOfWinningLine(squares, index) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningLines.some(
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && [a, b, c].includes(index)
  );
}

export default Board;
