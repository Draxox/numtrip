import Cell from "./Cell";

const RowBox = (props) => {
  const { cells, rowIndex, tempArr, randomNumber, setBoard, setRandomNumber } = props;
  return (
    <div className=" flex rounded-md duration-200 ">
      {cells.map((item, colIndex) => (
        <Cell
          item={item}
          rowIndex={rowIndex}
          colIndex={colIndex}
          tempArr={tempArr}
          randomNumber={randomNumber}
          setRandomNumber={setRandomNumber}
          setBoard={setBoard}
          key={colIndex}
        />
      ))}
    </div>
  );
};

export default RowBox;
