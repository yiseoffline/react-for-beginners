import { useState } from 'react';
import React from 'react';

function Win(squares){
  const winSquare=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0; i<winSquare.length; i++){
    const [a,b,c]=winSquare[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a]; // 수정: 승자의 기호를 반환하도록 변경
    }
  }
  return null;
}

function Reset({ squares, onClick }) {
  if(Win(squares)) {
    return <button onClick={onClick}>reset</button>;
  } else {
    return null;
  }
}

export default function Board() {
  const [value, setValue] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [next, setNext] = useState(true);
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState("");

  const clickBtn = (i) => {
    if(squares[i]==='X' || squares[i]==='O') return;

    const newSqaure = squares.slice();
    if(next){
      newSqaure[i]='X';
      setPlayer("X");
    } else {
      newSqaure[i]='O';
      setPlayer("O");
    }
    setSquares(newSqaure);
    setValue(newSqaure[i]);
    setNext(!next);

    const winner = Win(newSqaure);
    if(winner){
      setResult("Winner : " + winner);
    } else{
      setResult("Current Player : " + (player==="X"?"X":"O"));
    }
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setNext(true);
    setPlayer("");
    setResult("");
  };

  return (
    <>
      <h1>{result}</h1>
      <div>
        <button value={squares[0]} onClick={() => clickBtn(0)}>{squares[0]}</button>
        <button value={squares[1]} onClick={() => clickBtn(1)}>{squares[1]}</button>
        <button value={squares[2]} onClick={() => clickBtn(2)}>{squares[2]}</button>
      </div>
      <div>
        <button value={squares[3]} onClick={() => clickBtn(3)}>{squares[3]}</button>
        <button value={squares[4]} onClick={() => clickBtn(4)}>{squares[4]}</button>
        <button value={squares[5]} onClick={() => clickBtn(5)}>{squares[5]}</button>
      </div>
      <div>
        <button value={squares[6]} onClick={() => clickBtn(6)}>{squares[6]}</button>
        <button value={squares[7]} onClick={() => clickBtn(7)}>{squares[7]}</button>
        <button value={squares[8]} onClick={() => clickBtn(8)}>{squares[8]}</button>
      </div>
      <br/>
      <Reset squares={squares} onClick={resetGame} />
    </>
  );
}
