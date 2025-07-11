import RowBox from "./RowBox";
import GameOver from "./GameOver";
import { useGame } from "../context/GameContext";
import { useBoard } from "../context/BoardContext";
// import RandomNumberAndColor from "../utils/data";

const Board = () => {
  const { life, setLife, score, setScore, isGameOver, setIsGameOver } =
    useGame();
  const { board, setBoard, fillRandomNumber, tempArr } = useBoard();

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
    // console.log("Reshuffled Board:", tempArr);
    // console.log("Remaining Life:", life - 1);
  };

  return (
    <>
      {isGameOver && <GameOver reShuffle={reShuffle} />}
      <div className=" min-h-screen w-full flex flex-col items-center justify-center space-y-10">
        <h1 className="text-5xl font-mono font-bold">SCORE: {score}</h1>

        {/* board */}
        <div className="flex flex-col gap-1 border-2 border-gray-600 p-2 w-fit mx-auto rounded-md">
          {board.map((cell, rowIndex) => (
            <RowBox cells={cell} rowIndex={rowIndex} key={rowIndex} />
          ))}
        </div>
        <button
          onClick={() => {
            setLife(3);
            setScore(0);
            setIsGameOver(false);
            fillRandomNumber();
          }}
          className="bg-blue-500 px-4 py-2 rounded-md text-white text-2xl font-mono"
        >
          RESET
        </button>
      </div>
    </>
  );
};
export default Board;
