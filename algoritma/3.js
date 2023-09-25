function diagonalDifference(matrix) {
    // const data = collect(matrix);
    // const n = data.count();

    //n = count(matrix);
    n = matrix.lenght;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][n - i - 1];
    }

    return primaryDiagonalSum - secondaryDiagonalSum;
}

let matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

result = diagonalDifference(matrix);
console.table("Hasil: " + result) ;