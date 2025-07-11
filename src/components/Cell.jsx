import { useEffect, useState } from "react";
import RandomNumberAndColor from "../utils/data";
import PropTypes from "prop-types";
import { useGame } from "../context/GameContext";
import { useBoard } from "../context/BoardContext";

const Cell = (props) => {
  const { setScore, setIsGameOver } = useGame();
  const { setBoard, randomNumber, tempArr } = useBoard();
  const { item, rowIndex, colIndex } = props;
  const [targetCell, setTargetCell] = useState([]);
  // console.log("tempArr", tempArr);
  const checkAdjacent = (row, col, visited, cells) => {
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

    // setTargetCell((prev) => [...prev, { row, col }]);
    cells.push({ row, col });
    checkAdjacent(row + 1, col, visited, cells); //down
    checkAdjacent(row - 1, col, visited, cells); //up
    checkAdjacent(row, col + 1, visited, cells); //right
    checkAdjacent(row, col - 1, visited, cells); //left
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

  // const mulRandomArray = () => {
  //   if (!randomNumber.length) return;
  //   const minRandom = Math.min(...randomNumber);
  //   console.log("Min Random:", minRandom);
  //   console.log("tempArr:", tempArr);
  //   console.log("randomNumber before update:", randomNumber);
  //   if (!tempArr.flat().includes(minRandom)) {
  //     setRandomNumber((prevRandomNumber) => {
  //       prevRandomNumber.map((item) => item * 2);
  //       console.log(
  //         "updated",
  //         prevRandomNumber.map((item) => item * 2)
  //       );
  //     });
  //   }
  // };
  const gameOver = () => {
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length; j++) {
        const currentCell = tempArr[i][j];
        if (
          (i > 0 && tempArr[i - 1][j] == currentCell) || //up
          (i < tempArr.length - 1 && tempArr[i + 1][j] == currentCell) || //down
          (j > 0 && tempArr[i][j - 1] == currentCell) ||
          (j < tempArr[0].length - 1 && tempArr[i][j + 1] == currentCell)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handleClick = () => {
    if (gameOver()) {
      console.log("Game over and reshuffle the board option included");
      // activate the reshuffle function to be called in the gameOver component

      setIsGameOver(true);
    }
    // console.log(`Clicked...${item} value at (${rowIndex},${colIndex})`);
    setTargetCell([]);
    const visited = Array.from({ length: tempArr.length }, () =>
      Array(tempArr[0].length).fill(false)
    );
    const newTargetCells = [];
    checkAdjacent(rowIndex, colIndex, visited, newTargetCells);
    setTargetCell(newTargetCells);

    // console.log(`Target Cell: ${targetCell}`);
    // console.log("Temp Arr before shuffle:", tempArr);
  };

  useEffect(() => {
    // console.log("targetCell", targetCell);
    if (targetCell.length > 1) {
      mergeAndRefillCells();
      setScore((score) => score + 1);
    }
  }, [targetCell]);

  // useEffect(() => {
  //   mulRandomArray();
  // }, [tempArr]);

  //finding the bgColor of the cell of specific number
  const bgColor =
    RandomNumberAndColor.find((color) => color.number === item)?.bgColor ||
    "bg-gray-500";

  const handleShowItemValue = () => {
    if (item >= 1000 && item < 1000000) {
      return item + "K";
    } else if (item >= 1000000 && item < 1000000000) {
      return item + "M";
    } else if (item >= 1000000000 && item < 1000000000000) {
      return item + "B";
    } else if (item >= 1000000000000 && item < 1000000000000000) {
      return item + "T";
    } else {
      return item;
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`md:h-24 md:w-24 h-10 w-10 md:text-2xl text-white font-medium cursor-pointer border-2 border-black rounded-md hover:scale-95 active:bg-gray-300 duration-200 flex justify-center items-center ${bgColor}`}
      >
        {handleShowItemValue()}
      </div>
    </>
  );
};

Cell.propTypes = {
  item: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
};

export default Cell;
