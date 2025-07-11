
import { useGame } from "../context/GameContext";
const Header = () => {
  const { life } = useGame();
  return (
    <>
      <header className="fixed w-full flex justify-between items-center px-10 py-4 bg-black/10">
        <div className="text-3xl font-mono">
          Num<span className="text-red-600">Trip</span>
        </div>
        <div className="text-3xl font-extrabold">
          Life{" "}
          <span className={`${life == 0 ? "text-red-500" : "text-green-600"} `}>
            {life}
          </span>
        </div>
      </header>
    </>
  );
};


export default Header;
