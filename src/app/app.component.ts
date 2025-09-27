import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';

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
  boardAsWhite = [];

  boardStatus = null;

  selectedBox = null;

  possibleMoves: any = [
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
  ];

  constructor(private utilService: UtilsService) {
    this.boardStatus = utilService.boardStatus;
    this.boardAsWhite = utilService.boardAsWhite;
  }

  ngOnInit() {
    if (this.playingAsWhite) {
      this.initializeBoardAsWhite();
    }
  }

  initializeBoardAsWhite() {
    this.boardStatus.map((boardBox: any, index: number) => {
      if (boardBox?.name == 'A8' || boardBox?.name == 'H8') {
        this.boardStatus[index].occupiedBy = 'rook';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'A1' || boardBox?.name == 'H1') {
        this.boardStatus[index].occupiedBy = 'rook';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'B8' || boardBox?.name == 'G8') {
        this.boardStatus[index].occupiedBy = 'knight';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'B1' || boardBox?.name == 'G1') {
        this.boardStatus[index].occupiedBy = 'knight';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'C8' || boardBox?.name == 'F8') {
        this.boardStatus[index].occupiedBy = 'bishop';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'C1' || boardBox?.name == 'F1') {
        this.boardStatus[index].occupiedBy = 'bishop';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'D8') {
        this.boardStatus[index].occupiedBy = 'queen';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'D1') {
        this.boardStatus[index].occupiedBy = 'queen';
        this.boardStatus[index].occupiedByType = 'white';
      }
      if (boardBox?.name == 'E8') {
        this.boardStatus[index].occupiedBy = 'king';
        this.boardStatus[index].occupiedByType = 'black';
      } else if (boardBox?.name == 'E1') {
        this.boardStatus[index].occupiedBy = 'king';
        this.boardStatus[index].occupiedByType = 'white';
      }
      this.columnsWhite.map((item: any) => {
        if (boardBox?.name == `${item}7`) {
          this.boardStatus[index].occupiedBy = 'pawn';
          this.boardStatus[index].occupiedByType = 'black';
        }
      });
      this.columnsWhite.map((item: any) => {
        if (boardBox?.name == `${item}2`) {
          this.boardStatus[index].occupiedBy = 'pawn';
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
        if (boardBox?.occupiedByType != null && boardBox?.occupiedBy != null) {
          occupiedBy = boardBox?.occupiedByType + '-' + boardBox?.occupiedBy;
        }
      }
    });
    return occupiedBy;
  }

  selectBox(column: any, row: any) {
    this.boardStatus.map((boardBox: any) => {
      if (boardBox?.name == `${column + row}`) {
        if (boardBox?.occupiedBy) {
          if (this.selectedBox?.name == `${column + row}`) {
            this.selectedBox = null;
          } else {
            if (
              (boardBox?.occupiedByType == 'white' &&
                this.playingAsWhite == true) ||
              (boardBox?.occupiedByType == 'black' &&
                this.playingAsWhite == false)
            ) {
              this.selectedBox = {
                name: column + row,
                occupiedBy: boardBox?.occupiedBy,
                occupiedByType: boardBox?.occupiedByType,
              };
              this.getPossibleMoves();
            }
          }
        } else {
          // move piece if a possible box is selected after selecting apiee to move
          if (this.selectedBox?.name) {
            this.possibleMoves.map((move: any) => {
              if (move?.name == `${column + row}`) {
                this.boardStatus.map((boardBox: any, index: number) => {
                  // remove from source
                  if (boardBox?.name == this.selectedBox?.name) {
                    this.boardStatus[index] = {
                      ...this.boardStatus[index],
                      occupiedBy: null,
                      occupiedByType: null,
                    };
                  }
                  // add to from source
                  if (boardBox?.name == `${column + row}`) {
                    this.boardStatus[index] = {
                      ...this.boardStatus[index],
                      occupiedBy: this.selectedBox?.occupiedBy,
                      occupiedByType: this.selectedBox?.occupiedByType,
                    };
                  }
                });
                this.selectedBox = null;
                this.possibleMoves = [];
              }
            });
          }
        }
      }
    });
  }

  getPossibleMoves() {
    this.possibleMoves = [
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
    ];
  }

  isPossibleMove(column: any, row: any) {
    let possible = false;
    this.possibleMoves.map((move: any) => {
      if (move?.name == `${column + row}`) {
        possible = true;
      }
    });

    return possible;
  }

  checkIfSelected(column: any, row: any) {
    if (this.selectedBox?.name == `${column + row}`) {
      return true;
    } else {
      return false;
    }
  }
}
