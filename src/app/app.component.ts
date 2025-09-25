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

  boardStatus = [
    { name: 'A8', occupiedBy: null, occupiedByType: null },
    { name: 'B8', occupiedBy: null, occupiedByType: null },
    { name: 'C8', occupiedBy: null, occupiedByType: null },
    { name: 'D8', occupiedBy: null, occupiedByType: null },
    { name: 'E8', occupiedBy: null, occupiedByType: null },
    { name: 'F8', occupiedBy: null, occupiedByType: null },
    { name: 'G8', occupiedBy: null, occupiedByType: null },
    { name: 'H8', occupiedBy: null, occupiedByType: null },
    { name: 'A7', occupiedBy: null, occupiedByType: null },
    { name: 'B7', occupiedBy: null, occupiedByType: null },
    { name: 'C7', occupiedBy: null, occupiedByType: null },
    { name: 'D7', occupiedBy: null, occupiedByType: null },
    { name: 'E7', occupiedBy: null, occupiedByType: null },
    { name: 'F7', occupiedBy: null, occupiedByType: null },
    { name: 'G7', occupiedBy: null, occupiedByType: null },
    { name: 'H7', occupiedBy: null, occupiedByType: null },
    { name: 'A6', occupiedBy: null, occupiedByType: null },
    { name: 'B6', occupiedBy: null, occupiedByType: null },
    { name: 'C6', occupiedBy: null, occupiedByType: null },
    { name: 'D6', occupiedBy: null, occupiedByType: null },
    { name: 'E6', occupiedBy: null, occupiedByType: null },
    { name: 'F6', occupiedBy: null, occupiedByType: null },
    { name: 'G6', occupiedBy: null, occupiedByType: null },
    { name: 'H6', occupiedBy: null, occupiedByType: null },
    { name: 'A5', occupiedBy: null, occupiedByType: null },
    { name: 'B5', occupiedBy: null, occupiedByType: null },
    { name: 'C5', occupiedBy: null, occupiedByType: null },
    { name: 'D5', occupiedBy: null, occupiedByType: null },
    { name: 'E5', occupiedBy: null, occupiedByType: null },
    { name: 'F5', occupiedBy: null, occupiedByType: null },
    { name: 'G5', occupiedBy: null, occupiedByType: null },
    { name: 'H5', occupiedBy: null, occupiedByType: null },
    { name: 'A4', occupiedBy: null, occupiedByType: null },
    { name: 'B4', occupiedBy: null, occupiedByType: null },
    { name: 'C4', occupiedBy: null, occupiedByType: null },
    { name: 'D4', occupiedBy: null, occupiedByType: null },
    { name: 'E4', occupiedBy: null, occupiedByType: null },
    { name: 'F4', occupiedBy: null, occupiedByType: null },
    { name: 'G4', occupiedBy: null, occupiedByType: null },
    { name: 'H4', occupiedBy: null, occupiedByType: null },
    { name: 'A3', occupiedBy: null, occupiedByType: null },
    { name: 'B3', occupiedBy: null, occupiedByType: null },
    { name: 'C3', occupiedBy: null, occupiedByType: null },
    { name: 'D3', occupiedBy: null, occupiedByType: null },
    { name: 'E3', occupiedBy: null, occupiedByType: null },
    { name: 'F3', occupiedBy: null, occupiedByType: null },
    { name: 'G3', occupiedBy: null, occupiedByType: null },
    { name: 'H3', occupiedBy: null, occupiedByType: null },
    { name: 'A2', occupiedBy: null, occupiedByType: null },
    { name: 'B2', occupiedBy: null, occupiedByType: null },
    { name: 'C2', occupiedBy: null, occupiedByType: null },
    { name: 'D2', occupiedBy: null, occupiedByType: null },
    { name: 'E2', occupiedBy: null, occupiedByType: null },
    { name: 'F2', occupiedBy: null, occupiedByType: null },
    { name: 'G2', occupiedBy: null, occupiedByType: null },
    { name: 'H2', occupiedBy: null, occupiedByType: null },
    { name: 'A1', occupiedBy: null, occupiedByType: null },
    { name: 'B1', occupiedBy: null, occupiedByType: null },
    { name: 'C1', occupiedBy: null, occupiedByType: null },
    { name: 'D1', occupiedBy: null, occupiedByType: null },
    { name: 'E1', occupiedBy: null, occupiedByType: null },
    { name: 'F1', occupiedBy: null, occupiedByType: null },
    { name: 'G1', occupiedBy: null, occupiedByType: null },
    { name: 'H1', occupiedBy: null, occupiedByType: null },
  ];

  ngOnInit() {
    if (this.playingAsWhite) {
      this.initializeBoardAsWhite();
    }
  }

  initializeBoardAsWhite() {
    this.boardStatus.map((boardBox: any, index: number) => {
      if (boardBox?.name == 'A8' || boardBox?.name == 'H8') {
        this.boardStatus[index].occupiedBy = 'black-rook';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'A1' || boardBox?.name == 'H1') {
        this.boardStatus[index].occupiedBy = 'white-rook';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'B8' || boardBox?.name == 'G8') {
        this.boardStatus[index].occupiedBy = 'black-knight';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'B1' || boardBox?.name == 'G1') {
        this.boardStatus[index].occupiedBy = 'white-knight';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'C8' || boardBox?.name == 'F8') {
        this.boardStatus[index].occupiedBy = 'black-bishop';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'C1' || boardBox?.name == 'F1') {
        this.boardStatus[index].occupiedBy = 'white-bishop';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'D8') {
        this.boardStatus[index].occupiedBy = 'black-queen';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'D1') {
        this.boardStatus[index].occupiedBy = 'white-queen';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'E8') {
        this.boardStatus[index].occupiedBy = 'black-king';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'E1') {
        this.boardStatus[index].occupiedBy = 'white-king';
        this.boardStatus[index].occupiedByType = 'white';
      }
      this.columnsWhite.map((item: any) => {
        if (boardBox?.name == `${item}7`) {
          this.boardStatus[index].occupiedBy = 'black-pawn';
          this.boardStatus[index].occupiedByType = 'black';
        }
      });
      this.columnsWhite.map((item: any) => {
        if (boardBox?.name == `${item}2`) {
          this.boardStatus[index].occupiedBy = 'white-pawn';
          this.boardStatus[index].occupiedByType = 'white';
        }
      });
    });
  }

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

  getStatus(column: any, status: any) {
    let occupiedBy = null;
    this.boardStatus.map((boardBox: any) => {
      if (boardBox?.name == `${column}${status}`) {
        occupiedBy = boardBox?.occupiedBy;
      }
    });
    return occupiedBy;
  }
}
