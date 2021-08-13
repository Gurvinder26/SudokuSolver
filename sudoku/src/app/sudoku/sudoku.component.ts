import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Sudoku } from '../core/sudokuSolve';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit {
  public form;

  public showError: boolean = false;

  public matrix: Array<any>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.array([]);
    this.createForm();
  }

  public createForm() {
    for (let r = 0; r < 9; r++) {
      this.form.push(this.fb.array([]));
      for (let c = 0; c < 9; c++) {
        let a: FormArray = this.form.controls[r] as FormArray;
        a.push(new FormControl(''));
      }
    }
  }

  public solveSudoku() {
    this.showError = false;
    const sudoku = new Sudoku(this.form.value);
    if (sudoku.isValidSudoku) {
      this.form.setValue(sudoku.getSolution());
    } else {
      this.resetForm();
      this.showError = true;
    }
  }

  public resetForm() {
    this.showError = false;
    this.form.reset(new Array(9).fill('').map(() => new Array(9).fill('')));
  }
}
