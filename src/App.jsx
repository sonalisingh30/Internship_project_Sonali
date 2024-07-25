import React, { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import ValidateButton from './components/ValidateButton';
import SolveButton from './components/SolveButton';
import ErrorMessage from './components/ ErrorMessage';

const initialGrid = [
  ["5", "3", "",  "", "7", "",  "", "", ""],
  ["6", "",  "",  "1", "9", "5", "", "", ""],
  ["",  "9", "8", "", "", "",  "", "6", ""],
  ["8", "",  "",  "", "6", "",  "", "", "3"],
  ["4", "",  "",  "8", "",  "3", "", "", "1"],
  ["7", "",  "",  "", "2", "",  "", "", "6"],
  ["",  "6", "",  "", "", "",  "2", "8", ""],
  ["",  "",  "",  "4", "1", "9", "", "", "5"],
  ["",  "",  "",  "", "8", "",  "", "7", "9"]
];

const App = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = (grid, row, col, num) => {
    // Check if the number is already present in the row or column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }

    // Check if the number is present in the 3x3 sub-grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num.toString())) {
              grid[row][col] = num.toString();
              if (solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = ""; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const solve = () => {
    const gridCopy = grid.map(row => row.slice()); // Create a deep copy of the grid
    if (solveSudoku(gridCopy)) {
      setGrid(gridCopy);
      setErrorMessage("");
      alert("Sudoku solved!");
    } else {
      setErrorMessage("No solution exists for the provided Sudoku.");
    }
  };

  const isValidRow = (grid, row) => {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value === "") return false; // Return false if there's an empty cell
      if (seen.has(value)) return false;
      seen.add(value);
    }
    return true;
  };

  const isValidColumn = (grid, col) => {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const value = grid[row][col];
      if (value === "") return false; // Return false if there's an empty cell
      if (seen.has(value)) return false;
      seen.add(value);
    }
    return true;
  };

  const isValidSubGrid = (grid, row, col) => {
    const seen = new Set();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const value = grid[row + r][col + c];
        if (value === "") return false; // Return false if there's an empty cell
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
    return true;
  };

  const isValidSudoku = (grid) => {
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(grid, i) || !isValidColumn(grid, i)) {
        return false;
      }
    }

    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        if (!isValidSubGrid(grid, row, col)) {
          return false;
        }
      }
    }

    return true;
  };

  const validate = () => {
    if (isValidSudoku(grid)) {
      setErrorMessage("");
      alert("The Sudoku grid is valid!");
    } else {
      setErrorMessage("Invalid Sudoku grid! Make sure all cells are filled correctly.");
    }
  };

  return (
    <div>
      <h1>Sudoku Solver</h1>
      <SudokuGrid grid={grid} setGrid={setGrid} />
      <ValidateButton onValidate={validate} />
      <SolveButton onSolve={solve} />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default App;
