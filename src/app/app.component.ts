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

  A1RookKingCastleWhite = true;
  H1RookKingCastleWhite = true;
  A8RookKingCastleBlack = true;
  H8RookKingCastleBlack = true;

  boardStatus: BoardStatus = null;

  selectedBox = null;

  possibleMoves: string[] = [];

  movedFrom: string = '';
  movedTo: string = '';

  constructor(private utilService: UtilsService) {
    this.boardStatus = utilService.boardStatus;
    this.boardAsWhite = utilService.boardAsWhite;
  }

  ngOnInit() {
    this.initializeBoard();
  }

  get activeRows() {
    return this.playingAsWhite ? this.rowsWhite : this.rowsBlack;
  }

  get activeColumns() {
    return this.playingAsWhite ? this.columnsWhite : this.columnsBlack;
  }

  initializeBoard() {
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

          this.movedFrom = this.selectedBox.name;

          // Move piece to target
          this.boardStatus[square] = {
            occupiedBy: this.selectedBox.occupiedBy,
            occupiedByType: this.selectedBox.occupiedByType,
          };

          this.movedTo = square;

          // check if pawn has reached the opponent end
          this.checkIfPawnHasReachedOpponentsEnd(this.movedTo);

          // Break Castle If King or Rook is Moved
          this.breakKingCastling(this.selectedBox?.name, this.movedTo);

          // change turn
          this.playingAsWhite = !this.playingAsWhite;

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

    // check if selected piece is knight
    if (this.selectedBox.occupiedBy == 'knight') {
      for (let i = 0; i < tempObject?.moves?.length; i++) {
        if (this.boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.moves[i]);
        } else if (
          this.boardStatus[tempObject?.moves[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.moves[i]);
        } else if (
          this.boardStatus[tempObject?.moves[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
        }
      }
    } else if (this.selectedBox.occupiedBy == 'pawn') {
      if (this.selectedBox.occupiedByType == 'white') {
        tempObject =
          this.utilService.allPossiblePositions?.whitePawn?.[
            this.selectedBox?.name
          ];

        for (let i = 0; i < tempObject?.forward?.length; i++) {
          if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
            tempMoves.push(tempObject?.forward[i]);
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
            this.selectedBox?.occupiedByType
          ) {
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
            this.selectedBox?.occupiedByType
          ) {
          }
        }

        // Capture positions addition
        let captureLeft =
          this.utilService?.allPossiblePositions?.whitePawn[
            this.selectedBox?.name
          ]?.captureLeft;
        let captureRight =
          this.utilService?.allPossiblePositions?.whitePawn[
            this.selectedBox?.name
          ]?.captureRight;
        if (
          this.boardStatus[captureLeft]?.occupiedBy != null &&
          this.boardStatus[captureLeft]?.occupiedByType == 'black'
        ) {
          tempMoves.push(captureLeft[0]);
        }
        if (
          this.boardStatus[captureRight]?.occupiedBy != null &&
          this.boardStatus[captureRight]?.occupiedByType == 'black'
        ) {
          tempMoves.push(captureRight[0]);
        }
      } else {
        tempObject =
          this.utilService.allPossiblePositions?.blackPawn?.[
            this.selectedBox?.name
          ];

        for (let i = 0; i < tempObject?.forward?.length; i++) {
          if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
            tempMoves.push(tempObject?.forward[i]);
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
            this.selectedBox?.occupiedByType
          ) {
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
            this.selectedBox?.occupiedByType
          ) {
          }
        }

        // Capture positions addition
        let captureLeft =
          this.utilService?.allPossiblePositions?.blackPawn[
            this.selectedBox?.name
          ]?.captureLeft;
        let captureRight =
          this.utilService?.allPossiblePositions?.blackPawn[
            this.selectedBox?.name
          ]?.captureRight;
        if (
          this.boardStatus[captureLeft]?.occupiedBy != null &&
          this.boardStatus[captureLeft]?.occupiedByType == 'white'
        ) {
          tempMoves.push(captureLeft[0]);
        }
        if (
          this.boardStatus[captureRight]?.occupiedBy != null &&
          this.boardStatus[captureRight]?.occupiedByType == 'white'
        ) {
          tempMoves.push(captureRight[0]);
        }
      }
    } else {
      // Adding Left Possible moves

      for (let i = 0; i < tempObject?.left?.length; i++) {
        if (this.boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.left[i]);
        } else if (
          this.boardStatus[tempObject?.left[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.left[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.left[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding Right Possible moves

      for (let i = 0; i < tempObject?.right?.length; i++) {
        if (this.boardStatus[tempObject?.right[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.right[i]);
        } else if (
          this.boardStatus[tempObject?.right[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.right[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.right[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding Top Possible moves

      for (let i = 0; i < tempObject?.top?.length; i++) {
        if (this.boardStatus[tempObject?.top[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.top[i]);
        } else if (
          this.boardStatus[tempObject?.top[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.top[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.top[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding Bottom Possible moves

      for (let i = 0; i < tempObject?.bottom?.length; i++) {
        if (this.boardStatus[tempObject?.bottom[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.bottom[i]);
        } else if (
          this.boardStatus[tempObject?.bottom[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.bottom[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding leftTop Possible moves

      for (let i = 0; i < tempObject?.leftTop?.length; i++) {
        if (this.boardStatus[tempObject?.leftTop[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.leftTop[i]);
        } else if (
          this.boardStatus[tempObject?.leftTop[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.leftTop[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding topRight Possible moves

      for (let i = 0; i < tempObject?.topRight?.length; i++) {
        if (this.boardStatus[tempObject?.topRight[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.topRight[i]);
        } else if (
          this.boardStatus[tempObject?.topRight[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.topRight[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding rightBottom Possible moves

      for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
        if (this.boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.rightBottom[i]);
        } else if (
          this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.rightBottom[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }

      // Adding bottomLeft Possible moves

      for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
        if (this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.bottomLeft[i]);
        } else if (
          this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
          this.selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.bottomLeft[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
          this.selectedBox?.occupiedByType
        ) {
          break;
        }
      }
    }

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

  checkIfMovedFrom(column: any, row: any) {
    if (this.movedFrom == `${column + row}`) {
      return true;
    } else {
      return false;
    }
  }

  checkIfMovedTo(column: any, row: any) {
    if (this.movedTo == `${column + row}`) {
      return true;
    } else {
      return false;
    }
  }

  checkIfPawnHasReachedOpponentsEnd(movedTo: string) {
    if (this.boardStatus[movedTo].occupiedBy == 'pawn') {
      if (this.boardStatus[movedTo].occupiedByType == 'black') {
        if (movedTo[1] == '1') {
          // Let Player Replace Pawn with Queen
          this.boardStatus[movedTo].occupiedBy = 'queen';
        }
      } else {
        if (movedTo[1] == '8') {
          // Let Player Replace Pawn with Queen
          this.boardStatus[movedTo].occupiedBy = 'queen';
        }
      }
    }
  }

  breakKingCastling(movedFrom: string, movedTo: string) {
    if (this.boardStatus[movedTo].occupiedByType == 'white') {
      if (this.boardStatus[movedTo].occupiedBy == 'king') {
        this.H1RookKingCastleWhite = false;
        this.A1RookKingCastleWhite = false;
      } else if (
        movedFrom == 'A1' &&
        this.A1RookKingCastleWhite == true &&
        this.boardStatus[movedTo].occupiedBy == 'rook'
      ) {
        this.A1RookKingCastleWhite = false;
      } else if (
        movedFrom == 'H1' &&
        this.H1RookKingCastleWhite == true &&
        this.boardStatus[movedTo].occupiedBy == 'rook'
      ) {
        this.H1RookKingCastleWhite = false;
      }
    } else if (this.boardStatus[movedTo].occupiedByType == 'black') {
      if (this.boardStatus[movedTo].occupiedBy == 'king') {
        this.H8RookKingCastleBlack = false;
        this.A8RookKingCastleBlack = false;
      } else if (
        movedFrom == 'A8' &&
        this.A8RookKingCastleBlack == true &&
        this.boardStatus[movedTo].occupiedBy == 'rook'
      ) {
        this.A8RookKingCastleBlack = false;
      } else if (
        movedFrom == 'H8' &&
        this.H8RookKingCastleBlack == true &&
        this.boardStatus[movedTo].occupiedBy == 'rook'
      ) {
        this.H8RookKingCastleBlack = false;
      }
    }
  }
}
