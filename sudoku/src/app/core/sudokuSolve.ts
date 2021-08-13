import { cloneDeep } from 'lodash';

type allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface MatrixNumbers {
  [key: number]: boolean;
}

export class Sudoku {
  private _matrix: any;
  private _boxes: Array<MatrixNumbers>;
  private _rows: Array<MatrixNumbers>;
  private _cols: Array<MatrixNumbers>;
  public isValidSudoku: boolean;

  constructor(matrixToSolve: any) {
    this.isValidSudoku = true;
    this._matrix = cloneDeep(matrixToSolve);
    this._boxes = this._createHashes();
    this._rows = this._createHashes();
    this._cols = this._createHashes();
    this._addExistingValToHashes();
  }

  private _addExistingValToHashes() {
    for (let r = 0; r < 9 && this.isValidSudoku; r++) {
      for (let c = 0; c < 9; c++) {
        const val = this._matrix[r][c];
        if (val) {
          const boxId = this._getBoxId(r, c);
          if (
            this._rows[r][val] ||
            this._boxes[boxId][val] ||
            this._cols[c][val]
          ) {
            this.isValidSudoku = false;
            break;
          } else {
            this._boxes[boxId][val] = true;
            this._rows[r][val] = true;
            this._cols[c][val] = true;
          }
        }
      }
    }
  }

  private _createHashes(): Array<{}> {
    const arr = new Array(9);
    for (let i = 0; i < 9; i++) {
      arr[i] = {};
    }
    return arr;
  }

  /** Check for valid box, row and column */
  private _isValid(row: number, col: number): boolean {
    const val = this._matrix[row][col];
    const boxId = this._getBoxId(row, col);
    return (
      this._isRowValid(row, val) &&
      this._isColValid(col, val) &&
      this._isBoxValid(boxId, val)
    );
  }

  private _isRowValid(row: number, val: number): boolean {
    return !this._rows[row][val];
  }

  private _isColValid(col: number, val: number): boolean {
    return !this._cols[col][val];
  }

  private _isBoxValid(boxId: number, val: number): boolean {
    return !this._boxes[boxId][val];
  }

  private _getBoxId(rowIndex: number, colIndex: number): number {
    const colVal = Math.floor(colIndex / 3);
    const rowVal = Math.floor(rowIndex / 3) * 3;
    const boxId = colVal + rowVal;
    return boxId;
  }

  private _solveSoduku(r, c) {
    if (r === this._matrix.length || c === this._matrix[0].length) {
      return true;
    } else {
      if (this._matrix[r][c] === '') {
        for (let num = 1; num <= 9; num++) {
          this._matrix[r][c] = num;

          if (this._isValid(r, c)) {
            const boxId = this._getBoxId(r, c);
            this._boxes[boxId][num] = true;
            this._rows[r][num] = true;
            this._cols[c][num] = true;

            if (c === this._matrix[0].length - 1) {
              if (this._solveSoduku(r + 1, 0)) {
                return true;
              }
            } else {
              if (this._solveSoduku(r, c + 1)) {
                return true;
              }
            }
            delete this._boxes[boxId][num];
            delete this._rows[r][num];
            delete this._cols[c][num];
          }
          this._matrix[r][c] = '';
        }
      } else {
        if (c === this._matrix[0].length - 1) {
          if (this._solveSoduku(r + 1, 0)) {
            return true;
          }
        } else {
          if (this._solveSoduku(r, c + 1)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public getSolution() {
    this._solveSoduku(0, 0);
    return this._matrix;
  }
}

// const a = new Sudoku([
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ]);
// a.getSolution();
