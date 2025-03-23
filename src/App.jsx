import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  const [life, setLife] = useState(3);
  const [score, setScore] = useState(0);
  return (
    <>
      <div className="w-full min-h-screen ">
        <Header life={life} />
        <Board
          life={life}
          setLife={setLife}
          score={score}
          setScore={setScore}
        />
      </div>
    </>
  );
}

export default App;
