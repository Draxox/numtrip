import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import { BoardProvider } from "./context/BoardContext";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <BoardProvider>
        <div className="w-full min-h-screen">
          <Header />
          <Board />
        </div>
      </BoardProvider>
    </GameProvider>
  );
}

export default App;
