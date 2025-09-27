import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';
interface BoardStatus {
  [square: string]: {
    occupiedBy: string | null;
    occupiedByType: string | null;
  };
}

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

  boardStatus: BoardStatus = null;

  selectedBox = null;

  possibleMoves: string[] = ['D4', 'E4'];

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
    this.boardStatus = {
      // Rank 8 (Black major pieces)
      A8: { occupiedBy: 'rook', occupiedByType: 'black' },
      B8: { occupiedBy: 'knight', occupiedByType: 'black' },
      C8: { occupiedBy: 'bishop', occupiedByType: 'black' },
      D8: { occupiedBy: 'queen', occupiedByType: 'black' },
      E8: { occupiedBy: 'king', occupiedByType: 'black' },
      F8: { occupiedBy: 'bishop', occupiedByType: 'black' },
      G8: { occupiedBy: 'knight', occupiedByType: 'black' },
      H8: { occupiedBy: 'rook', occupiedByType: 'black' },

      // Rank 7 (Black pawns)
      A7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      B7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      C7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      D7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      E7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      F7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      G7: { occupiedBy: 'pawn', occupiedByType: 'black' },
      H7: { occupiedBy: 'pawn', occupiedByType: 'black' },

      // Ranks 6 → 3 (empty squares)
      A6: { occupiedBy: null, occupiedByType: null },
      B6: { occupiedBy: null, occupiedByType: null },
      C6: { occupiedBy: null, occupiedByType: null },
      D6: { occupiedBy: null, occupiedByType: null },
      E6: { occupiedBy: null, occupiedByType: null },
      F6: { occupiedBy: null, occupiedByType: null },
      G6: { occupiedBy: null, occupiedByType: null },
      H6: { occupiedBy: null, occupiedByType: null },

      A5: { occupiedBy: null, occupiedByType: null },
      B5: { occupiedBy: null, occupiedByType: null },
      C5: { occupiedBy: null, occupiedByType: null },
      D5: { occupiedBy: null, occupiedByType: null },
      E5: { occupiedBy: null, occupiedByType: null },
      F5: { occupiedBy: null, occupiedByType: null },
      G5: { occupiedBy: null, occupiedByType: null },
      H5: { occupiedBy: null, occupiedByType: null },

      A4: { occupiedBy: null, occupiedByType: null },
      B4: { occupiedBy: null, occupiedByType: null },
      C4: { occupiedBy: null, occupiedByType: null },
      D4: { occupiedBy: null, occupiedByType: null },
      E4: { occupiedBy: null, occupiedByType: null },
      F4: { occupiedBy: null, occupiedByType: null },
      G4: { occupiedBy: null, occupiedByType: null },
      H4: { occupiedBy: null, occupiedByType: null },

      A3: { occupiedBy: null, occupiedByType: null },
      B3: { occupiedBy: null, occupiedByType: null },
      C3: { occupiedBy: null, occupiedByType: null },
      D3: { occupiedBy: null, occupiedByType: null },
      E3: { occupiedBy: null, occupiedByType: null },
      F3: { occupiedBy: null, occupiedByType: null },
      G3: { occupiedBy: null, occupiedByType: null },
      H3: { occupiedBy: null, occupiedByType: null },

      // Rank 2 (White pawns)
      A2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      B2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      C2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      D2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      E2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      F2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      G2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      H2: { occupiedBy: 'pawn', occupiedByType: 'white' },

      // Rank 1 (White major pieces)
      A1: { occupiedBy: 'rook', occupiedByType: 'white' },
      B1: { occupiedBy: 'knight', occupiedByType: 'white' },
      C1: { occupiedBy: 'bishop', occupiedByType: 'white' },
      D1: { occupiedBy: 'queen', occupiedByType: 'white' },
      E1: { occupiedBy: 'king', occupiedByType: 'white' },
      F1: { occupiedBy: 'bishop', occupiedByType: 'white' },
      G1: { occupiedBy: 'knight', occupiedByType: 'white' },
      H1: { occupiedBy: 'rook', occupiedByType: 'white' },
    };
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

  getStatus(column: any, row: any) {
    return this.boardStatus[`${column}${row}`].occupiedByType != null &&
      this.boardStatus[`${column}${row}`].occupiedBy != null
      ? this.boardStatus[`${column}${row}`].occupiedByType +
          '-' +
          this.boardStatus[`${column}${row}`].occupiedBy
      : null;
  }

  // selectBox(column: any, row: any) {
  //   this.boardStatus.map((boardBox: any) => {
  //     if (boardBox?.name == `${column + row}`) {
  //       if (boardBox?.occupiedBy) {
  //         if (this.selectedBox?.name == `${column + row}`) {
  //           this.selectedBox = null;
  //         } else {
  //           if (
  //             (boardBox?.occupiedByType == 'white' &&
  //               this.playingAsWhite == true) ||
  //             (boardBox?.occupiedByType == 'black' &&
  //               this.playingAsWhite == false)
  //           ) {
  //             this.selectedBox = {
  //               name: column + row,
  //               occupiedBy: boardBox?.occupiedBy,
  //               occupiedByType: boardBox?.occupiedByType,
  //             };
  //             this.getPossibleMoves();
  //           }
  //         }
  //       } else {
  //         // move piece if a possible box is selected after selecting apiee to move
  //         if (this.selectedBox?.name) {
  //           this.possibleMoves.map((move: any) => {
  //             if (move == `${column + row}`) {
  //               this.boardStatus.map((boardBox: any, index: number) => {
  //                 // remove from source
  //                 if (boardBox?.name == this.selectedBox?.name) {
  //                   this.boardStatus[index] = {
  //                     ...this.boardStatus[index],
  //                     occupiedBy: null,
  //                     occupiedByType: null,
  //                   };
  //                 }
  //                 // add to from source
  //                 if (boardBox?.name == `${column + row}`) {
  //                   this.boardStatus[index] = {
  //                     ...this.boardStatus[index],
  //                     occupiedBy: this.selectedBox?.occupiedBy,
  //                     occupiedByType: this.selectedBox?.occupiedByType,
  //                   };
  //                 }
  //               });
  //               this.selectedBox = null;
  //               this.possibleMoves = [];
  //             }
  //           });
  //         }
  //       }
  //     }
  //   });
  // }

  selectBox(column: string, row: string | number) {
    const square = `${column}${row}`;
    const boardBox = this.boardStatus[square];

    if (boardBox?.occupiedBy) {
      // If clicking the same selected piece → deselect
      if (this.selectedBox?.name === square) {
        this.selectedBox = null;
      } else {
        // Select only if it’s the player’s turn and piece matches color
        if (
          (boardBox?.occupiedByType === 'white' && this.playingAsWhite) ||
          (boardBox?.occupiedByType === 'black' && !this.playingAsWhite)
        ) {
          this.selectedBox = {
            name: square,
            occupiedBy: boardBox.occupiedBy,
            occupiedByType: boardBox.occupiedByType,
          };
          this.getPossibleMoves();
        }
      }
    } else {
      // If empty square and a piece is selected
      if (this.selectedBox?.name) {
        if (this.possibleMoves.includes(square)) {
          // Clear source
          this.boardStatus[this.selectedBox.name] = {
            occupiedBy: null,
            occupiedByType: null,
          };

          // Move piece to target
          this.boardStatus[square] = {
            occupiedBy: this.selectedBox.occupiedBy,
            occupiedByType: this.selectedBox.occupiedByType,
          };

          // Reset state
          this.selectedBox = null;
          this.possibleMoves = [];
        }
      }
    }
  }

  getPossibleMoves() {
    let tempMoves: any = [];

    let tempObject =
      this.utilService.allPossiblePositions[this.selectedBox?.occupiedBy]?.[
        this.selectedBox?.name
      ];

    console.log(tempObject);

    // pushing left moves
    // tempObject?.left.map((items:any)=> {
    //   if()
    // })

    tempMoves.push(
      ...tempObject?.left,
      ...tempObject?.right,
      ...tempObject?.top,
      ...tempObject?.bottom,
      ...tempObject?.leftTop,
      ...tempObject?.topRight,
      ...tempObject?.rightBottom,
      ...tempObject?.bottomLeft
    );

    this.possibleMoves = tempMoves;
  }

  isPossibleMove(column: any, row: any) {
    return this.possibleMoves.includes(column + row);
  }

  checkIfSelected(column: any, row: any) {
    if (this.selectedBox?.name == `${column + row}`) {
      return true;
    } else {
      return false;
    }
  }
}
