import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  playingAsWhite = true;
  columnsWhite = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rowsWhite = ['8', '7', '6', '5', '4', '3', '2', '1'];
  columnsBlack = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  rowsBlack = ['1', '2', '3', '4', '5', '6', '7', '8'];
  boardAsWhite = [
    'A8',
    'B8',
    'C8',
    'D8',
    'E8',
    'F8',
    'G8',
    'H8',
    'A7',
    'B7',
    'C7',
    'D7',
    'E7',
    'F7',
    'G7',
    'H7',
    'A6',
    'B6',
    'C6',
    'D6',
    'E6',
    'F6',
    'G6',
    'H6',
    'A5',
    'B5',
    'C5',
    'D5',
    'E5',
    'F5',
    'G5',
    'H5',
    'A4',
    'B4',
    'C4',
    'D4',
    'E4',
    'F4',
    'G4',
    'H4',
    'A3',
    'B3',
    'C3',
    'D3',
    'E3',
    'F3',
    'G3',
    'H3',
    'A2',
    'B2',
    'C2',
    'D2',
    'E2',
    'F2',
    'G2',
    'H2',
    'A1',
    'B1',
    'C1',
    'D1',
    'E1',
    'F1',
    'G1',
    'H1',
  ];

  checkIfWhiteBox(column, row) {
    const blackBoards: string[] = this.boardAsWhite.filter((square) => {
      const col = square[0]; // e.g. 'A'
      const row = square[1]; // e.g. '8'

      const colIndex = this.columnsWhite.indexOf(col);
      const rowIndex = this.rowsWhite.indexOf(row);

      // sum indices; if even => black square
      return (colIndex + rowIndex) % 2 === 0;
    });

    console.log(blackBoards);
    if (blackBoards.includes(`${column}${row}`)) {
      return true;
    } else {
      return false;
    }
  }
}
