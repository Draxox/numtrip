import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

const getStoredNumber = (key, fallback) => {
  const stored = sessionStorage.getItem(key);
  return stored !== null ? Number(stored) : fallback;
};

export const GameProvider = ({ children }) => {
  const [life, setLife] = useState(() => getStoredNumber("life", 3));
  const [score, setScore] = useState(() => getStoredNumber("score", 0));
  const [isGameOver, setIsGameOver] = useState(
    () => sessionStorage.getItem("isGameOver") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("life", life);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("isGameOver", isGameOver);
  }, [life, score, isGameOver]);

  return (
    <GameContext.Provider
      value={{
        life,
        setLife,
        score,
        setScore,
        isGameOver,
        setIsGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
