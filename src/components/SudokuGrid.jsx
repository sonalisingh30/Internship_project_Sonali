import React from 'react';
import styles from './styles/SudokuGrid.module.css';

const SudokuGrid = ({ grid, setGrid }) => {
  const handleChange = (e, row, col) => {
    const value = e.target.value;
    if (!isNaN(value) && value <= 9 && value >= 0) {
      const newGrid = grid.map((r, rowIndex) =>
        r.map((val, colIndex) =>
          rowIndex === row && colIndex === col ? value : val
        )
      );
      setGrid(newGrid);
    }
  };

  return (
    <div className={styles.grid}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((value, colIndex) => (
            <input
              key={colIndex}
              type="text"
              value={value}
              maxLength="1"
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              className={styles.cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
