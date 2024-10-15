import { useEffect, useState } from "react";
import RowBox from "./RowBox";
// import RandomNumberAndColor from "../utils/data";
const tempArr = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const Board = () => {
  const [board, setBoard] = useState([]);
  const [randomNumber, setRandomNumber] = useState(
    // RandomNumberAndColor.map((number) => number.number)
    [2, 4, 8]
  );

  const fillRandomNumber = () => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        var index = Math.floor(Math.random() * randomNumber.length);
        tempArr[i][j] = randomNumber[index];
        console.log("index-> ", index);
      }
    }
    setBoard([...tempArr]);
  };
  useEffect(() => {
    fillRandomNumber.call();
  }, []);

  return (
    <>
      <div className=" min-h-screen flex flex-col items-center space-y-10 mt-10">
        <h1 className="text-5xl font-mono font-bold">NumTrip</h1>
        {/* small boxes */}
        <div className=" border-2 border-blue-700 p-2 w-fit mx-auto rounded-md">
          {board.map((cell, rowIndex) => (
            <RowBox
              cells={cell}
              rowIndex={rowIndex}
              tempArr={tempArr}
              randomNumber={randomNumber}
              setRandomNumber={setRandomNumber}
              setBoard={setBoard}
              key={rowIndex}
            />
          ))}
        </div>
        <button
          onClick={() => {
            fillRandomNumber.call();
            setBoard[[]];
          }}
          className="bg-blue-500 px-4 py-2 rounded-md text-white"
        >
          RESET
        </button>
      </div>
    </>
  );
};

export default Board;
