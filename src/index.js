module.exports = function solveSudoku(matrix) {
  // matrix: 9x9 
  var arr = matrixToArray(matrix);
  solver(arr);
  solved = arrayToMatrix(arr)
  return solved;
}

function solver(grid) {
  // return if there are no more zeros
  var i = grid.indexOf(0);
  if (i == -1) {
    return true;
  }
  var candidates = getCandidates(i, grid);
  if (candidates !== null) {
    // try for each candidate
    for (var c = 0; c < candidates.length; c++) {
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
  var excluded_numbers = getExcludedNumber(i, arr)
  var candidates = []
  for (var i = 1; i < 10; i++) {
    if (excluded_numbers.has(i)) continue;
    candidates.push(i);
  }
  if (candidates.length == 0) { return null }
  return candidates;
}

function getExcludedNumber(i, arr) {
  // get numbers that can't be in a cell
  var excluded_numbers = new Set();
  for (var j = 0; j < 81; j++) {
    if (sameRow(i, j) || sameCol(i, j) || sameSquare(i, j)) {
      excluded_numbers.add(arr[j])
    }
  }
  excluded_numbers.delete(0);
  return excluded_numbers;
}

function sameRow(i, j) {
  return (Math.floor(i / 9) == Math.floor(j / 9));
}

function sameCol(i, j) {
  return (Math.floor(i - j) % 9 == 0);
}

function sameSquare(i, j) {
  return (Math.floor(i / 27) == Math.floor(j / 27)
    && Math.floor(i % 9 / 3) == Math.floor(j % 9 / 3));
}

function matrixToArray(matrix) {
  var arr = [];
  for (row of matrix) for (e of row) arr.push(e);
  return arr;
}

function arrayToMatrix(arr) {
  var matrix = [];
  while (arr.length) {
    matrix.push(arr.splice(0, 9));
  }
  return matrix;
}