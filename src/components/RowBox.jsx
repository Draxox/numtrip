import Cell from "./Cell";
import PropTypes from "prop-types";
const RowBox = (props) => {
  const {
    cells,
    rowIndex,
    tempArr,
    randomNumber,
    setBoard,
    setRandomNumber,
    setIsGameOver,
    setScore,
  } = props;
  return (
    <div className="flex rounded-md duration-200 gap-1">
      {cells.map((item, colIndex) => (
        <Cell
          item={item}
          rowIndex={rowIndex}
          colIndex={colIndex}
          tempArr={tempArr}
          randomNumber={randomNumber}
          setRandomNumber={setRandomNumber}
          setBoard={setBoard}
          setIsGameOver={setIsGameOver}
          setScore={setScore}
          key={colIndex}
        />
      ))}
    </div>
  );
};

RowBox.propTypes = {
  cells: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  tempArr: PropTypes.array.isRequired,
  randomNumber: PropTypes.array.isRequired,
  setBoard: PropTypes.func.isRequired,
  setRandomNumber: PropTypes.func.isRequired,
  setIsGameOver: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default RowBox;
