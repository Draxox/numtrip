import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RowBox from "./RowBox";
import GameOver from "./GameOver";
// import RandomNumberAndColor from "../utils/data";
const tempArr = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const Board = ({ life, setLife, score, setScore }) => {
  const [board, setBoard] = useState([]);
  const [randomNumber, setRandomNumber] = useState(
    // RandomNumberAndColor.map((number) => number.number)
    [2, 4, 8]
  );
  const [isGameOver, setIsGameOver] = useState(false);

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

  const reShuffle = () => {
    if (life === 0) {
      setIsGameOver(true);
      return;
    }
    const flatArray = tempArr.flat();
    for (let i = flatArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
    }
    //rebuild the tempArr
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length; j++) {
        tempArr[i][j] = flatArray[i * tempArr[i].length + j];
      }
    }
    setBoard([...tempArr]);
    setLife((life) => life - 1);
    console.log("Reshuffled Board:", tempArr);
    console.log("Remaining Life:", life - 1);
  };

  return (
    <>
      {isGameOver && (
        <GameOver
          setIsGameOver={setIsGameOver}
          life={life}
          setLife={setLife}
          reShuffle={reShuffle}
        />
      )}
      <div className=" min-h-screen w-full flex flex-col items-center justify-center space-y-10">
        <h1 className="text-5xl font-mono font-bold">SCORE: {score}</h1>

        {/* board */}
        <div className="flex flex-col gap-1 border-2 border-gray-600 p-2 w-fit mx-auto rounded-md">
          {board.map((cell, rowIndex) => (
            <RowBox
              cells={cell}
              rowIndex={rowIndex}
              tempArr={tempArr}
              randomNumber={randomNumber}
              setRandomNumber={setRandomNumber}
              setBoard={setBoard}
              setIsGameOver={setIsGameOver}
              setScore={setScore}
              key={rowIndex}
            />
          ))}
        </div>
        <button
          onClick={() => {
            fillRandomNumber.call();
            setBoard([...tempArr]);
          }}
          className="bg-blue-500 px-4 py-2 rounded-md text-white text-2xl font-mono"
        >
          RESET
        </button>
      </div>
    </>
  );
};
Board.propTypes = {
  life: PropTypes.number.isRequired,
  setLife: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};
export default Board;
