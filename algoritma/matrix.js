const MATRIX = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const sumOfSubstraction = (matrix) => {
  let sum = 0;
  let diagonalLeft = 0;
  let diagonalRight = 0;

  for (let i = 0; i < matrix.length; i++) {
    diagonalLeft += matrix[i][i];
    diagonalRight += matrix[i][matrix.length - 1 - i];
  }

  sum = diagonalLeft - diagonalRight;
  return sum;
};

console.log(sumOfSubstraction(MATRIX));
