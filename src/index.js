module.exports = function solveSudoku(matrix) {
  // matrix: 9x9
  const arr = matrixToArray(matrix);
  solver(arr);
  const solved = arrayToMatrix(arr);
  return solved;
};

function solver(grid) {
  // return if there are no more zeros
  const i = grid.indexOf(0);
  if (i == -1) {
    return true;
  }
  const candidates = getCandidates(i, grid);
  if (candidates !== null) {
    // try for each candidate
    for (let c = 0; c < candidates.length; c++) {
      grid[i] = candidates[c];
      // go deeper
      if (solver(grid)) {
        return true;
      }
    }
    // revert to 0
    grid[i] = 0;
  }
  // go earlier
  return false;
}

function getCandidates(i, arr) {
  // return posible values for a cell or null
  const excluded_numbers = getExcludedNumber(i, arr);
  const candidates = [];
  for (let i = 1; i < 10; i++) {
    if (excluded_numbers.has(i)) continue;
    candidates.push(i);
  }
  if (candidates.length == 0) {
    return null;
  }
  return candidates;
}

function getExcludedNumber(i, arr) {
  // get numbers that can't be in a cell
  const excluded_numbers = new Set();
  for (let j = 0; j < 81; j++) {
    if (sameRow(i, j) || sameCol(i, j) || sameSquare(i, j)) {
      excluded_numbers.add(arr[j]);
    }
  }
  excluded_numbers.delete(0);
  return excluded_numbers;
}

function sameRow(i, j) {
  return Math.floor(i / 9) == Math.floor(j / 9);
}

function sameCol(i, j) {
  return Math.floor(i - j) % 9 == 0;
}

function sameSquare(i, j) {
  return (
    Math.floor(i / 27) == Math.floor(j / 27) && Math.floor((i % 9) / 3) == Math.floor((j % 9) / 3)
  );
}

function matrixToArray(matrix) {
  const arr = [];
  for (const row of matrix) for (const e of row) arr.push(e);
  return arr;
}

function arrayToMatrix(arr) {
  const matrix = [];
  while (arr.length) {
    matrix.push(arr.splice(0, 9));
  }
  return matrix;
}
