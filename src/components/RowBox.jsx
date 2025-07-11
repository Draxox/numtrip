import Cell from "./Cell";
import PropTypes from "prop-types";
const RowBox = (props) => {
  const { cells, rowIndex } = props;
  return (
    <div className="flex rounded-md duration-200 gap-1">
      {cells.map((item, colIndex) => (
        <Cell
          item={item}
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={colIndex}
        />
      ))}
    </div>
  );
};

RowBox.propTypes = {
  cells: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default RowBox;
