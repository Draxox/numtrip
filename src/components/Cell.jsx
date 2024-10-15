import { useEffect, useState } from "react";
import RandomNumberAndColor from "../utils/data";

const Cell = (props) => {
  const {
    item,
    rowIndex,
    colIndex,
    tempArr,
    randomNumber,
    setBoard,
    setRandomNumber,
  } = props;
  const [targetCell, setTargetCell] = useState([]);
  // console.log("tempArr", tempArr);
  const checkAdjacent = (row, col, visited) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= tempArr.length ||
      col >= tempArr[0].length ||
      visited[row][col] ||
      tempArr[row][col] !== item
    ) {
      return;
    }

    visited[row][col] = true;

    setTargetCell((prev) => [...prev, { row, col }]);
    checkAdjacent(row + 1, col, visited); //down
    checkAdjacent(row - 1, col, visited); //up
    checkAdjacent(row, col + 1, visited); //right
    checkAdjacent(row, col - 1, visited); //left
  };

  const mergeAndRefillCells = () => {
    if (targetCell.length > 1) {
      tempArr[rowIndex][colIndex] = item * 2;

      //refill other adjacent cells with random values of the randomNumber array
      targetCell.slice(1).forEach((cell) => {
        tempArr[cell.row][cell.col] =
          randomNumber[Math.floor(Math.random() * randomNumber.length)];
      });
      setBoard([...tempArr]);
    }
  };

  const mulRandomArray = () => {
    const minRandom = Math.min(...randomNumber);
    console.log("Min Random:", minRandom);
    console.log("tempArr:", tempArr);
    console.log("randomNumber before update:", randomNumber);
    if (!tempArr.flat().includes(minRandom)) {
      setRandomNumber((prevRandomNumber) => {
        console.log(
          "updated",
          prevRandomNumber.map((item) => item * 2)
        );
        prevRandomNumber.map((item) => item * 2);
      });
    }
  };

  const handleClick = () => {
    console.log(`Clicked...${item} value at (${rowIndex},${colIndex})`);
    setTargetCell([]);
    const visited = Array.from({ length: tempArr.length }, () =>
      Array(tempArr[0].length).fill(false)
    );
    checkAdjacent(rowIndex, colIndex, visited);
    // console.log(`Target Cell: ${targetCell}`);
  };

  useEffect(() => {
    console.log("targetCell", targetCell);
    if (targetCell.length > 1) {
      mergeAndRefillCells();
    }
  }, [targetCell]);

  useEffect(() => {
    mulRandomArray();
  }, [tempArr]);

  //finding the bgColor of the cell of specific number
  const bgColor = RandomNumberAndColor.find(
    (color) => color.number === item
  )?.bgColor;

  return (
    <div
      onClick={handleClick}
      className={`h-24 w-24 text-2xl text-white font-medium cursor-pointer border-2 border-black rounded-md  hover:scale-95 active:bg-gray-300 duration-200 flex justify-center items-center ${bgColor}`}
    >
      {item}
    </div>
  );
};

export default Cell;
