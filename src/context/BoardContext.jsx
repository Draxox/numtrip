import { createContext, useContext, useEffect, useState } from "react";

const BoardContext = createContext();

const tempArr = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(() => {
    const saved = sessionStorage.getItem("board");
    if (saved) {
      const parsed = JSON.parse(saved);
      // sync parsed board to tempArr too
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          tempArr[i][j] = parsed[i][j];
        }
      }
      return parsed;
    }
    return [...tempArr]; // fallback
  });
  const [randomNumber, setRandomNumber] = useState(() => {
    const saved = sessionStorage.getItem("randomNumber");
    return saved ? JSON.parse(saved) : [2, 4, 8];
  });

  const fillRandomNumber = () => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        var index = Math.floor(Math.random() * randomNumber.length);
        tempArr[i][j] = randomNumber[index];
        console.log("index-> ", index);
      }
    }
    setBoard([...tempArr]);
    sessionStorage.setItem("board", JSON.stringify(tempArr));
  };
  useEffect(() => {
    const saved = sessionStorage.getItem("board");
    if (!saved) {
      fillRandomNumber();
    }
  }, []);

  // Save to session on every update
  useEffect(() => {
    sessionStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    sessionStorage.setItem("randomNumber", JSON.stringify(randomNumber));
  }, [randomNumber]);
  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        randomNumber,
        setRandomNumber,
        fillRandomNumber,
        tempArr,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
