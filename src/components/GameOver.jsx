import PropTypes from "prop-types";
import { useGame } from "../context/GameContext";

const GameOver = ({ reShuffle }) => {
  const { life, setIsGameOver } = useGame();

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/70 text-white z-10">
        <div className="bg-red-600/60 p-6 rounded-md flex flex-col gap-10 font-mono font-bold">
          <h1 className="text-5xl">Game Over Please Try Again</h1>

          {life > 0 ? (
            <button
              onClick={() => {
                reShuffle();
                setIsGameOver(false);
              }}
              className="px-4 py-4 border-2 text-3xl text-white rounded-md hover:bg-white hover:text-black duration-100"
            >
              Reshuffle
            </button>
          ) : (
            <button
              onClick={() => setIsGameOver(false)}
              className="px-4 py-4 border-2 text-3xl text-white rounded-md hover:bg-white hover:text-black duration-100"
            >
              Use Super Powers
            </button>
          )}

          <button
            onClick={() => {
              sessionStorage.clear(); //clear session storage
              window.location.reload();
            }}
            className="px-4 py-4 bg-white text-3xl text-black rounded-md"
          >
            Restart
          </button>
        </div>
      </div>
    </>
  );
};

GameOver.propTypes = {
  reShuffle: PropTypes.func.isRequired,
};

export default GameOver;
