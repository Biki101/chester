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
  possibleBlackMoves: string[] = [];
  possibleWhiteMoves: string[] = [];

  blackKingPosition: string = 'A4';
  whiteKingPosition: string = 'H3';

  movedFrom: string = '';
  movedTo: string = '';

  gameDraw = false;
  whiteWon = false;
  blackWon = false;

  constructor(private utilService: UtilsService) {
    this.boardStatus = utilService.boardStatus;
    this.boardAsWhite = utilService.boardAsWhite;
  }

  capturedWhiteList: any = [];
  capturedBlackList: any = [];

  blackKingChecked = false;
  whiteKingChecked = false;

  ngOnInit() {
    this.initializeBoard();
    // this.getAllPossibleBlackMoves();
    // this.getAllPossibleWhiteMoves();
    // this.checkIfKingIsChecked();
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
      A8: { occupiedBy: null, occupiedByType: null },
      B8: { occupiedBy: null, occupiedByType: null },
      C8: { occupiedBy: null, occupiedByType: null },
      D8: { occupiedBy: null, occupiedByType: null },
      E8: { occupiedBy: null, occupiedByType: null },
      F8: { occupiedBy: null, occupiedByType: null },
      G8: { occupiedBy: null, occupiedByType: null },
      H8: { occupiedBy: null, occupiedByType: null },

      // Rank 7 (Black pawns)
      A7: { occupiedBy: null, occupiedByType: null },
      B7: { occupiedBy: null, occupiedByType: null },
      C7: { occupiedBy: null, occupiedByType: null },
      D7: { occupiedBy: null, occupiedByType: null },
      E7: { occupiedBy: null, occupiedByType: null },
      F7: { occupiedBy: null, occupiedByType: null },
      G7: { occupiedBy: null, occupiedByType: null },
      H7: { occupiedBy: null, occupiedByType: null },

      // Ranks 6 → 3 (empty squares)
      A6: { occupiedBy: null, occupiedByType: null },
      B6: { occupiedBy: null, occupiedByType: null },
      C6: { occupiedBy: 'rook', occupiedByType: 'black' },
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

      A4: { occupiedBy: 'king', occupiedByType: 'black' },
      B4: { occupiedBy: null, occupiedByType: null },
      C4: { occupiedBy: null, occupiedByType: null },
      D4: { occupiedBy: null, occupiedByType: null },
      E4: { occupiedBy: 'queen', occupiedByType: 'black' },
      F4: { occupiedBy: null, occupiedByType: null },
      G4: { occupiedBy: null, occupiedByType: null },
      H4: { occupiedBy: null, occupiedByType: null },

      A3: { occupiedBy: null, occupiedByType: null },
      B3: { occupiedBy: 'rook', occupiedByType: 'black' },
      C3: { occupiedBy: null, occupiedByType: null },
      D3: { occupiedBy: null, occupiedByType: null },
      E3: { occupiedBy: null, occupiedByType: null },
      F3: { occupiedBy: null, occupiedByType: null },
      G3: { occupiedBy: null, occupiedByType: null },
      H3: { occupiedBy: 'king', occupiedByType: 'white' },

      // Rank 2 (White pawns)
      A2: { occupiedBy: null, occupiedByType: null },
      B2: { occupiedBy: null, occupiedByType: null },
      C2: { occupiedBy: null, occupiedByType: null },
      D2: { occupiedBy: null, occupiedByType: null },
      E2: { occupiedBy: null, occupiedByType: null },
      F2: { occupiedBy: null, occupiedByType: null },
      G2: { occupiedBy: 'pawn', occupiedByType: 'white' },
      H2: { occupiedBy: null, occupiedByType: null },

      // Rank 1 (White major pieces)
      A1: { occupiedBy: null, occupiedByType: null },
      B1: { occupiedBy: null, occupiedByType: null },
      C1: { occupiedBy: null, occupiedByType: null },
      D1: { occupiedBy: null, occupiedByType: null },
      E1: { occupiedBy: null, occupiedByType: null },
      F1: { occupiedBy: null, occupiedByType: null },
      G1: { occupiedBy: null, occupiedByType: null },
      H1: { occupiedBy: null, occupiedByType: null },
    };
    // {
    //   // Rank 8 (Black major pieces)
    //   A8: { occupiedBy: 'rook', occupiedByType: 'black' },
    //   B8: { occupiedBy: 'knight', occupiedByType: 'black' },
    //   C8: { occupiedBy: 'bishop', occupiedByType: 'black' },
    //   D8: { occupiedBy: 'queen', occupiedByType: 'black' },
    //   E8: { occupiedBy: 'king', occupiedByType: 'black' },
    //   F8: { occupiedBy: 'bishop', occupiedByType: 'black' },
    //   G8: { occupiedBy: 'knight', occupiedByType: 'black' },
    //   H8: { occupiedBy: 'rook', occupiedByType: 'black' },

    //   // Rank 7 (Black pawns)
    //   A7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   B7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   C7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   D7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   E7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   F7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   G7: { occupiedBy: 'pawn', occupiedByType: 'black' },
    //   H7: { occupiedBy: 'pawn', occupiedByType: 'black' },

    //   // Ranks 6 → 3 (empty squares)
    //   A6: { occupiedBy: null, occupiedByType: null },
    //   B6: { occupiedBy: null, occupiedByType: null },
    //   C6: { occupiedBy: null, occupiedByType: null },
    //   D6: { occupiedBy: null, occupiedByType: null },
    //   E6: { occupiedBy: null, occupiedByType: null },
    //   F6: { occupiedBy: null, occupiedByType: null },
    //   G6: { occupiedBy: null, occupiedByType: null },
    //   H6: { occupiedBy: null, occupiedByType: null },

    //   A5: { occupiedBy: null, occupiedByType: null },
    //   B5: { occupiedBy: null, occupiedByType: null },
    //   C5: { occupiedBy: null, occupiedByType: null },
    //   D5: { occupiedBy: null, occupiedByType: null },
    //   E5: { occupiedBy: null, occupiedByType: null },
    //   F5: { occupiedBy: null, occupiedByType: null },
    //   G5: { occupiedBy: null, occupiedByType: null },
    //   H5: { occupiedBy: null, occupiedByType: null },

    //   A4: { occupiedBy: null, occupiedByType: null },
    //   B4: { occupiedBy: null, occupiedByType: null },
    //   C4: { occupiedBy: null, occupiedByType: null },
    //   D4: { occupiedBy: null, occupiedByType: null },
    //   E4: { occupiedBy: null, occupiedByType: null },
    //   F4: { occupiedBy: null, occupiedByType: null },
    //   G4: { occupiedBy: null, occupiedByType: null },
    //   H4: { occupiedBy: null, occupiedByType: null },

    //   A3: { occupiedBy: null, occupiedByType: null },
    //   B3: { occupiedBy: null, occupiedByType: null },
    //   C3: { occupiedBy: null, occupiedByType: null },
    //   D3: { occupiedBy: null, occupiedByType: null },
    //   E3: { occupiedBy: null, occupiedByType: null },
    //   F3: { occupiedBy: null, occupiedByType: null },
    //   G3: { occupiedBy: null, occupiedByType: null },
    //   H3: { occupiedBy: null, occupiedByType: null },

    //   // Rank 2 (White pawns)
    //   A2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   B2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   C2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   D2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   E2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   F2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   G2: { occupiedBy: 'pawn', occupiedByType: 'white' },
    //   H2: { occupiedBy: 'pawn', occupiedByType: 'white' },

    //   // Rank 1 (White major pieces)
    //   A1: { occupiedBy: 'rook', occupiedByType: 'white' },
    //   B1: { occupiedBy: 'knight', occupiedByType: 'white' },
    //   C1: { occupiedBy: 'bishop', occupiedByType: 'white' },
    //   D1: { occupiedBy: 'queen', occupiedByType: 'white' },
    //   E1: { occupiedBy: 'king', occupiedByType: 'white' },
    //   F1: { occupiedBy: 'bishop', occupiedByType: 'white' },
    //   G1: { occupiedBy: 'knight', occupiedByType: 'white' },
    //   H1: { occupiedBy: 'rook', occupiedByType: 'white' },
    // };
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
    if (
      this.gameDraw == true ||
      this.whiteWon == true ||
      this.blackWon == true
    ) {
      return;
    }

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
      // Capturing opponent
      if (
        (boardBox?.occupiedByType === 'black' && this.playingAsWhite == true) ||
        (boardBox?.occupiedByType === 'white' && this.playingAsWhite == false)
      ) {
        if (this.possibleMoves.includes(square)) {
          this.movePieceFromSourceToTarget(square);
        }
      }
    } else {
      // If empty square and a piece is selected
      if (this.selectedBox?.name) {
        if (this.possibleMoves.includes(square)) {
          this.movePieceFromSourceToTarget(square);
        }
      }
    }
  }

  movePieceFromSourceToTarget(square: string) {
    // Allowing only valid moves if King is checked
    let validMove = this.checkIfValidMove(square);
    if (validMove == false) {
      return;
    }

    // Clear source
    this.boardStatus[this.selectedBox.name] = {
      occupiedBy: null,
      occupiedByType: null,
    };

    this.movedFrom = this.selectedBox.name;

    // Check if Capturing or Just Moving
    if (this.boardStatus[square].occupiedBy != null) {
      if (this.boardStatus[square].occupiedByType == 'white') {
        this.capturedWhiteList.push(this.boardStatus[square]);
      } else {
        this.capturedBlackList.push(this.boardStatus[square]);
      }
    }

    // Move piece to target
    this.boardStatus[square] = {
      occupiedBy: this.selectedBox.occupiedBy,
      occupiedByType: this.selectedBox.occupiedByType,
    };

    // checking if king
    if (
      this.selectedBox.occupiedBy == 'king' &&
      this.selectedBox.occupiedByType == 'black'
    ) {
      this.blackKingPosition = square;
    } else if (
      this.selectedBox.occupiedBy == 'king' &&
      this.selectedBox.occupiedByType == 'white'
    ) {
      this.whiteKingPosition = square;
    }

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

    // Geting All Possible Black and White Moves
    this.getAllPossibleBlackMoves();
    this.getAllPossibleWhiteMoves();

    // Check if king is checked
    this.checkIfKingIsChecked();

    // Check If Game is Draw
    this.checkIfGameIsDraw();
  }

  checkIfGameIsDraw() {
    let tempDraw = true;

    if (this.playingAsWhite == true && this.whiteKingChecked == false) {
      if (this.possibleWhiteMoves.length == 0) {
        this.gameDraw = true;
      } else {
        for (const square in this.boardStatus) {
          const pieceInfo = { name: square, ...this.boardStatus[square] };

          if (pieceInfo.occupiedByType == 'white') {
            let possibleMoves = this.getPossibleMovesForGameDraw(pieceInfo);
            console.log(pieceInfo);
            console.log(possibleMoves);
            possibleMoves.map((move: any) => {
              let isValid = this.checkIfValidMoveWithSelectedMove(
                move,
                pieceInfo
              );
              console.log(isValid);
              if (isValid) {
                tempDraw = false;
              }
            });
          }
        }
        this.gameDraw = tempDraw;
      }
    } else if (this.playingAsWhite == false && this.blackKingChecked == false) {
      if (this.possibleBlackMoves.length == 0) {
        this.gameDraw = true;
      } else {
        for (const square in this.boardStatus) {
          const pieceInfo = { name: square, ...this.boardStatus[square] };

          if (pieceInfo.occupiedByType == 'black') {
            let possibleMoves = this.getPossibleMovesForGameDraw(pieceInfo);
            console.log(pieceInfo);
            console.log(possibleMoves);
            possibleMoves.map((move: any) => {
              let isValid = this.checkIfValidMoveWithSelectedMove(
                move,
                pieceInfo
              );
              console.log(isValid);
              if (isValid) {
                tempDraw = false;
              }
            });
          }
        }
        this.gameDraw = tempDraw;
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

    if (this.selectedBox.occupiedBy == 'king') {
      if (
        this.selectedBox.occupiedByType == 'white' &&
        this.selectedBox?.name == 'E1'
      ) {
        let canBeCastled = true;
        if (this.A1RookKingCastleWhite == true) {
          // For A1 Castle
          tempObject?.castleA1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA1[0]);
          }
        }
        if (this.H1RookKingCastleWhite == true) {
          // For H1 Castle
          canBeCastled = true;
          tempObject?.castleH1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH1[0]);
          }
        }
      } else if (
        this.selectedBox.occupiedByType == 'black' &&
        this.selectedBox?.name == 'E8'
      ) {
        // For A8 Castle
        let canBeCastled = true;
        if (this.A8RookKingCastleBlack == true) {
          tempObject?.castleA8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA8[0]);
          }
        }
        // For H8 Castle
        if (this.H8RookKingCastleBlack == true) {
          canBeCastled = true;
          tempObject?.castleH8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH8[0]);
          }
        }
      }
    }

    // Making king's Safe possible moves
    if (this.selectedBox.occupiedBy == 'king') {
      if (this.selectedBox.occupiedByType == 'black') {
        tempMoves = tempMoves.filter(
          (item: any) => !this.possibleWhiteMoves.includes(item)
        );
      } else {
        tempMoves = tempMoves.filter(
          (item: any) => !this.possibleBlackMoves.includes(item)
        );
      }
    }

    this.possibleMoves = tempMoves;
  }

  getPossibleMovesForGameDraw(selectedBox: any) {
    let tempMoves: any = [];

    let tempObject =
      this.utilService.allPossiblePositions[selectedBox?.occupiedBy]?.[
        selectedBox?.name
      ];

    // check if selected piece is knight
    if (selectedBox.occupiedBy == 'knight') {
      for (let i = 0; i < tempObject?.moves?.length; i++) {
        if (this.boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
          tempMoves.push(tempObject?.moves[i]);
        } else if (
          this.boardStatus[tempObject?.moves[i]]?.occupiedByType !==
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.moves[i]);
        } else if (
          this.boardStatus[tempObject?.moves[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
        ) {
        }
      }
    } else if (selectedBox.occupiedBy == 'pawn') {
      if (selectedBox.occupiedByType == 'white') {
        tempObject =
          this.utilService.allPossiblePositions?.whitePawn?.[selectedBox?.name];

        for (let i = 0; i < tempObject?.forward?.length; i++) {
          if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
            tempMoves.push(tempObject?.forward[i]);
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
            selectedBox?.occupiedByType
          ) {
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
            selectedBox?.occupiedByType
          ) {
          }
        }

        // Capture positions addition
        let captureLeft =
          this.utilService?.allPossiblePositions?.whitePawn[selectedBox?.name]
            ?.captureLeft;
        let captureRight =
          this.utilService?.allPossiblePositions?.whitePawn[selectedBox?.name]
            ?.captureRight;
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
          this.utilService.allPossiblePositions?.blackPawn?.[selectedBox?.name];

        for (let i = 0; i < tempObject?.forward?.length; i++) {
          if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
            tempMoves.push(tempObject?.forward[i]);
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
            selectedBox?.occupiedByType
          ) {
          } else if (
            this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
            selectedBox?.occupiedByType
          ) {
          }
        }

        // Capture positions addition
        let captureLeft =
          this.utilService?.allPossiblePositions?.blackPawn[selectedBox?.name]
            ?.captureLeft;
        let captureRight =
          this.utilService?.allPossiblePositions?.blackPawn[selectedBox?.name]
            ?.captureRight;
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.left[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.left[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.right[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.right[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.top[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.top[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.bottom[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.leftTop[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.topRight[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.rightBottom[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
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
          selectedBox?.occupiedByType
        ) {
          tempMoves.push(tempObject?.bottomLeft[i]);
          break;
        } else if (
          this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
          selectedBox?.occupiedByType
        ) {
          break;
        }
      }
    }

    if (selectedBox.occupiedBy == 'king') {
      if (selectedBox.occupiedByType == 'white' && selectedBox?.name == 'E1') {
        let canBeCastled = true;
        if (this.A1RookKingCastleWhite == true) {
          // For A1 Castle
          tempObject?.castleA1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA1[0]);
          }
        }
        if (this.H1RookKingCastleWhite == true) {
          // For H1 Castle
          canBeCastled = true;
          tempObject?.castleH1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH1[0]);
          }
        }
      } else if (
        selectedBox.occupiedByType == 'black' &&
        selectedBox?.name == 'E8'
      ) {
        // For A8 Castle
        let canBeCastled = true;
        if (this.A8RookKingCastleBlack == true) {
          tempObject?.castleA8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA8[0]);
          }
        }
        // For H8 Castle
        if (this.H8RookKingCastleBlack == true) {
          canBeCastled = true;
          tempObject?.castleH8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH8[0]);
          }
        }
      }
    }

    // Making king's Safe possible moves
    if (selectedBox.occupiedBy == 'king') {
      if (selectedBox.occupiedByType == 'black') {
        tempMoves = tempMoves.filter(
          (item: any) => !this.possibleWhiteMoves.includes(item)
        );
      } else {
        tempMoves = tempMoves.filter(
          (item: any) => !this.possibleBlackMoves.includes(item)
        );
      }
    }

    return tempMoves;
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
    // Check If Castling

    if (this.boardStatus[movedTo].occupiedBy == 'king') {
      if (this.boardStatus[movedTo].occupiedByType == 'black') {
        if (movedFrom == 'E8' && movedTo == 'G8') {
          this.boardStatus = {
            ...this.boardStatus,
            H8: {
              occupiedBy: null,
              occupiedByType: null,
            },
            F8: {
              occupiedBy: 'rook',
              occupiedByType: 'black',
            },
          };
          this.H8RookKingCastleBlack = false;
        } else if (movedFrom == 'E8' && movedTo == 'C8') {
          this.boardStatus = {
            ...this.boardStatus,
            A8: {
              occupiedBy: null,
              occupiedByType: null,
            },
            D8: {
              occupiedBy: 'rook',
              occupiedByType: 'black',
            },
          };
          this.A8RookKingCastleBlack = false;
        }
      } else if (this.boardStatus[movedTo].occupiedByType == 'white') {
        if (movedFrom == 'E1' && movedTo == 'G1') {
          this.boardStatus = {
            ...this.boardStatus,
            H1: {
              occupiedBy: null,
              occupiedByType: null,
            },
            F1: {
              occupiedBy: 'rook',
              occupiedByType: 'white',
            },
          };
          this.H1RookKingCastleWhite = false;
        } else if (movedFrom == 'E1' && movedTo == 'C1') {
          this.boardStatus = {
            ...this.boardStatus,
            A1: {
              occupiedBy: null,
              occupiedByType: null,
            },
            D1: {
              occupiedBy: 'rook',
              occupiedByType: 'white',
            },
          };
          this.A1RookKingCastleWhite = false;
        }
      }
    }

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

  checkIfKingIsChecked() {
    if (this.possibleBlackMoves.includes(this.whiteKingPosition)) {
      this.whiteKingChecked = true;
    } else if (this.possibleWhiteMoves.includes(this.blackKingPosition)) {
      this.blackKingChecked = true;
    } else {
      this.whiteKingChecked = false;
      this.blackKingChecked = false;
    }
  }

  getAllPossibleBlackMoves() {
    let tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (this.boardStatus[box].occupiedByType == 'black') {
        let tempObject =
          this.utilService.allPossiblePositions[
            this.boardStatus[box].occupiedBy
          ]?.[box];
        // check if selected piece is knight
        if (this.boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (this.boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              this.boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              this.boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              this.boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              this.boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (this.boardStatus[box].occupiedBy == 'pawn') {
          tempObject = this.utilService.allPossiblePositions?.blackPawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
            } else if (
              this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.blackPawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.blackPawn[box]
              ?.captureRight;
          if (
            this.boardStatus[captureLeft]?.occupiedBy != null &&
            this.boardStatus[captureLeft]?.occupiedByType == 'white'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            this.boardStatus[captureRight]?.occupiedBy != null &&
            this.boardStatus[captureRight]?.occupiedByType == 'white'
          ) {
            if (captureRight[0]) {
              tempMoves.push(captureRight[0]);
            }
          }
          // }
        } else {
          // Adding Left Possible moves

          for (let i = 0; i < tempObject?.left?.length; i++) {
            if (this.boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.left[i]);
            } else if (
              this.boardStatus[tempObject?.left[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.left[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.right[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.top[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }

        if (this.boardStatus[box].occupiedBy == 'king' && box == 'E8') {
          // For A8 Castle
          let canBeCastled = true;
          tempObject?.castleA8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA8[0]);
          }
          // For H8 Castle
          canBeCastled = true;
          tempObject?.castleH8ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH8[0]);
          }
          // }
        }
      }
    });

    this.possibleBlackMoves = this.removeDuplicates(tempMoves);
  }

  getAllPossibleWhiteMoves() {
    let tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (this.boardStatus[box].occupiedByType == 'white') {
        let tempObject =
          this.utilService.allPossiblePositions[
            this.boardStatus[box].occupiedBy
          ]?.[box];
        // check if selected piece is knight
        if (this.boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (this.boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              this.boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              this.boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              this.boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              this.boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (this.boardStatus[box].occupiedBy == 'pawn') {
          // if (this.boardStatus[box].occupiedByType == 'white') {
          tempObject = this.utilService.allPossiblePositions?.whitePawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (this.boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              this.boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
            } else if (
              this.boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.whitePawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.whitePawn[box]
              ?.captureRight;
          if (
            this.boardStatus[captureLeft]?.occupiedBy != null &&
            this.boardStatus[captureLeft]?.occupiedByType == 'black'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            this.boardStatus[captureRight]?.occupiedBy != null &&
            this.boardStatus[captureRight]?.occupiedByType == 'black'
          ) {
            if (captureRight[0]) {
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.left[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.right[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.top[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
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
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              this.boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              this.boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              this.boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }
        if (this.boardStatus[box].occupiedBy == 'king' && box == 'E1') {
          // For A1 Castle
          let canBeCastled = true;
          tempObject?.castleA1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA1[0]);
          }
          // For H1 Castle
          canBeCastled = true;
          tempObject?.castleH1ClearPaths?.map((path: string) => {
            if (this.boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH1[0]);
          }
        }
      }
    });

    this.possibleWhiteMoves = this.removeDuplicates(tempMoves);
  }

  removeDuplicates(arr: any): string[] {
    return [...new Set(arr)] as string[];
  }

  checkIfChecked(column: any, row: any) {
    let square = column + row;
    if (
      this.boardStatus[square].occupiedBy == 'king' &&
      this.boardStatus[square].occupiedByType == 'black' &&
      this.blackKingChecked == true
    ) {
      return true;
    } else if (
      this.boardStatus[square].occupiedBy == 'king' &&
      this.boardStatus[square].occupiedByType == 'white' &&
      this.whiteKingChecked == true
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkIfValidMove(square: string) {
    let validMove = true;
    let boardStatus = { ...this.boardStatus };
    let possibleWhiteMoves = [...this.possibleWhiteMoves];
    let possibleBlackMoves = [...this.possibleBlackMoves];
    let blackKingPosition = this.blackKingPosition;
    let whiteKingPosition = this.whiteKingPosition;
    let selectedBox = { ...this.selectedBox };
    let whiteKingChecked = this.whiteKingChecked;
    let blackKingChecked = this.blackKingChecked;
    let playingAsWhite = this.playingAsWhite;

    // clearing source
    boardStatus[selectedBox.name] = {
      occupiedBy: null,
      occupiedByType: null,
    };

    // move piece to target
    boardStatus[square] = {
      occupiedBy: selectedBox.occupiedBy,
      occupiedByType: selectedBox.occupiedByType,
    };

    // checking if king
    if (
      selectedBox.occupiedBy == 'king' &&
      selectedBox.occupiedByType == 'black'
    ) {
      blackKingPosition = square;
    } else if (
      selectedBox.occupiedBy == 'king' &&
      selectedBox.occupiedByType == 'white'
    ) {
      whiteKingPosition = square;
    }

    // Reset state
    selectedBox = null;

    // getting possible black moves
    let tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (boardStatus[box].occupiedByType == 'black') {
        let tempObject =
          this.utilService.allPossiblePositions[boardStatus[box].occupiedBy]?.[
            box
          ];
        // check if selected piece is knight
        if (boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (boardStatus[box].occupiedBy == 'pawn') {
          tempObject = this.utilService.allPossiblePositions?.blackPawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.blackPawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.blackPawn[box]
              ?.captureRight;
          if (
            boardStatus[captureLeft]?.occupiedBy != null &&
            boardStatus[captureLeft]?.occupiedByType == 'white'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            boardStatus[captureRight]?.occupiedBy != null &&
            boardStatus[captureRight]?.occupiedByType == 'white'
          ) {
            if (captureRight[0]) {
              tempMoves.push(captureRight[0]);
            }
          }
          // }
        } else {
          // Adding Left Possible moves

          for (let i = 0; i < tempObject?.left?.length; i++) {
            if (boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.left[i]);
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Right Possible moves

          for (let i = 0; i < tempObject?.right?.length; i++) {
            if (boardStatus[tempObject?.right[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.right[i]);
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Top Possible moves

          for (let i = 0; i < tempObject?.top?.length; i++) {
            if (boardStatus[tempObject?.top[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.top[i]);
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Bottom Possible moves

          for (let i = 0; i < tempObject?.bottom?.length; i++) {
            if (boardStatus[tempObject?.bottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottom[i]);
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding leftTop Possible moves

          for (let i = 0; i < tempObject?.leftTop?.length; i++) {
            if (boardStatus[tempObject?.leftTop[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.leftTop[i]);
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding topRight Possible moves

          for (let i = 0; i < tempObject?.topRight?.length; i++) {
            if (boardStatus[tempObject?.topRight[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.topRight[i]);
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }

        if (boardStatus[box].occupiedBy == 'king' && box == 'E8') {
          // For A8 Castle
          let canBeCastled = true;
          tempObject?.castleA8ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA8[0]);
          }
          // For H8 Castle
          canBeCastled = true;
          tempObject?.castleH8ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH8[0]);
          }
          // }
        }
      }
    });

    possibleBlackMoves = this.removeDuplicates(tempMoves);

    // get all possible white moves
    tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (boardStatus[box].occupiedByType == 'white') {
        let tempObject =
          this.utilService.allPossiblePositions[boardStatus[box].occupiedBy]?.[
            box
          ];
        // check if selected piece is knight
        if (boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (boardStatus[box].occupiedBy == 'pawn') {
          // if (boardStatus[box].occupiedByType == 'white') {
          tempObject = this.utilService.allPossiblePositions?.whitePawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.whitePawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.whitePawn[box]
              ?.captureRight;
          if (
            boardStatus[captureLeft]?.occupiedBy != null &&
            boardStatus[captureLeft]?.occupiedByType == 'black'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            boardStatus[captureRight]?.occupiedBy != null &&
            boardStatus[captureRight]?.occupiedByType == 'black'
          ) {
            if (captureRight[0]) {
              tempMoves.push(captureRight[0]);
            }
          }
        } else {
          // Adding Left Possible moves

          for (let i = 0; i < tempObject?.left?.length; i++) {
            if (boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.left[i]);
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Right Possible moves

          for (let i = 0; i < tempObject?.right?.length; i++) {
            if (boardStatus[tempObject?.right[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.right[i]);
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Top Possible moves

          for (let i = 0; i < tempObject?.top?.length; i++) {
            if (boardStatus[tempObject?.top[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.top[i]);
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Bottom Possible moves

          for (let i = 0; i < tempObject?.bottom?.length; i++) {
            if (boardStatus[tempObject?.bottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottom[i]);
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding leftTop Possible moves

          for (let i = 0; i < tempObject?.leftTop?.length; i++) {
            if (boardStatus[tempObject?.leftTop[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.leftTop[i]);
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding topRight Possible moves

          for (let i = 0; i < tempObject?.topRight?.length; i++) {
            if (boardStatus[tempObject?.topRight[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.topRight[i]);
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }
        if (boardStatus[box].occupiedBy == 'king' && box == 'E1') {
          // For A1 Castle
          let canBeCastled = true;
          tempObject?.castleA1ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA1[0]);
          }
          // For H1 Castle
          canBeCastled = true;
          tempObject?.castleH1ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH1[0]);
          }
        }
      }
    });

    possibleWhiteMoves = this.removeDuplicates(tempMoves);

    // Validity Logic
    if (possibleBlackMoves.includes(whiteKingPosition)) {
      whiteKingChecked = true;
    } else if (possibleWhiteMoves.includes(blackKingPosition)) {
      blackKingChecked = true;
    } else {
      whiteKingChecked = false;
      blackKingChecked = false;
    }

    if (
      whiteKingChecked == true &&
      playingAsWhite == true &&
      possibleBlackMoves.includes(whiteKingPosition) == true
    ) {
      validMove = false;
    } else if (
      blackKingChecked == true &&
      playingAsWhite == false &&
      possibleWhiteMoves.includes(blackKingPosition) == true
    ) {
      validMove = false;
    }

    return validMove;
  }

  checkIfValidMoveWithSelectedMove(square: string, selectedBox: any) {
    let validMove = true;
    let boardStatus = { ...this.boardStatus };
    let possibleWhiteMoves = [...this.possibleWhiteMoves];
    let possibleBlackMoves = [...this.possibleBlackMoves];
    let blackKingPosition = this.blackKingPosition;
    let whiteKingPosition = this.whiteKingPosition;
    let whiteKingChecked = this.whiteKingChecked;
    let blackKingChecked = this.blackKingChecked;
    let playingAsWhite = this.playingAsWhite;

    // clearing source
    boardStatus[selectedBox.name] = {
      occupiedBy: null,
      occupiedByType: null,
    };

    // move piece to target
    boardStatus[square] = {
      occupiedBy: selectedBox.occupiedBy,
      occupiedByType: selectedBox.occupiedByType,
    };

    // checking if king
    if (
      selectedBox.occupiedBy == 'king' &&
      selectedBox.occupiedByType == 'black'
    ) {
      blackKingPosition = square;
    } else if (
      selectedBox.occupiedBy == 'king' &&
      selectedBox.occupiedByType == 'white'
    ) {
      whiteKingPosition = square;
    }

    // Reset state
    selectedBox = null;

    // getting possible black moves
    let tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (boardStatus[box].occupiedByType == 'black') {
        let tempObject =
          this.utilService.allPossiblePositions[boardStatus[box].occupiedBy]?.[
            box
          ];
        // check if selected piece is knight
        if (boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (boardStatus[box].occupiedBy == 'pawn') {
          tempObject = this.utilService.allPossiblePositions?.blackPawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.blackPawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.blackPawn[box]
              ?.captureRight;
          if (
            boardStatus[captureLeft]?.occupiedBy != null &&
            boardStatus[captureLeft]?.occupiedByType == 'white'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            boardStatus[captureRight]?.occupiedBy != null &&
            boardStatus[captureRight]?.occupiedByType == 'white'
          ) {
            if (captureRight[0]) {
              tempMoves.push(captureRight[0]);
            }
          }
          // }
        } else {
          // Adding Left Possible moves

          for (let i = 0; i < tempObject?.left?.length; i++) {
            if (boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.left[i]);
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Right Possible moves

          for (let i = 0; i < tempObject?.right?.length; i++) {
            if (boardStatus[tempObject?.right[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.right[i]);
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Top Possible moves

          for (let i = 0; i < tempObject?.top?.length; i++) {
            if (boardStatus[tempObject?.top[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.top[i]);
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Bottom Possible moves

          for (let i = 0; i < tempObject?.bottom?.length; i++) {
            if (boardStatus[tempObject?.bottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottom[i]);
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding leftTop Possible moves

          for (let i = 0; i < tempObject?.leftTop?.length; i++) {
            if (boardStatus[tempObject?.leftTop[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.leftTop[i]);
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding topRight Possible moves

          for (let i = 0; i < tempObject?.topRight?.length; i++) {
            if (boardStatus[tempObject?.topRight[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.topRight[i]);
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }

        if (boardStatus[box].occupiedBy == 'king' && box == 'E8') {
          // For A8 Castle
          let canBeCastled = true;
          tempObject?.castleA8ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA8[0]);
          }
          // For H8 Castle
          canBeCastled = true;
          tempObject?.castleH8ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH8[0]);
          }
          // }
        }
      }
    });

    possibleBlackMoves = this.removeDuplicates(tempMoves);

    // get all possible white moves
    tempMoves = [];

    this.utilService.boardAsWhite?.map((box: any) => {
      if (boardStatus[box].occupiedByType == 'white') {
        let tempObject =
          this.utilService.allPossiblePositions[boardStatus[box].occupiedBy]?.[
            box
          ];
        // check if selected piece is knight
        if (boardStatus[box].occupiedBy == 'knight') {
          for (let i = 0; i < tempObject?.moves?.length; i++) {
            if (boardStatus[tempObject?.moves[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType !==
              boardStatus[box].occupiedByType
            ) {
              tempMoves.push(tempObject?.moves[i]);
            } else if (
              boardStatus[tempObject?.moves[i]]?.occupiedByType ===
              boardStatus[box].occupiedByType
            ) {
            }
          }
        } else if (boardStatus[box].occupiedBy == 'pawn') {
          // if (boardStatus[box].occupiedByType == 'white') {
          tempObject = this.utilService.allPossiblePositions?.whitePawn?.[box];

          for (let i = 0; i < tempObject?.forward?.length; i++) {
            if (boardStatus[tempObject?.forward[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.forward[i]);
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
            } else if (
              boardStatus[tempObject?.forward[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
            }
          }

          // Capture positions addition
          let captureLeft =
            this.utilService?.allPossiblePositions?.whitePawn[box]?.captureLeft;
          let captureRight =
            this.utilService?.allPossiblePositions?.whitePawn[box]
              ?.captureRight;
          if (
            boardStatus[captureLeft]?.occupiedBy != null &&
            boardStatus[captureLeft]?.occupiedByType == 'black'
          ) {
            if (captureLeft[0]) {
              tempMoves.push(captureLeft[0]);
            }
          }
          if (
            boardStatus[captureRight]?.occupiedBy != null &&
            boardStatus[captureRight]?.occupiedByType == 'black'
          ) {
            if (captureRight[0]) {
              tempMoves.push(captureRight[0]);
            }
          }
        } else {
          // Adding Left Possible moves

          for (let i = 0; i < tempObject?.left?.length; i++) {
            if (boardStatus[tempObject?.left[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.left[i]);
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.left[i]);
              break;
            } else if (
              boardStatus[tempObject?.left[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Right Possible moves

          for (let i = 0; i < tempObject?.right?.length; i++) {
            if (boardStatus[tempObject?.right[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.right[i]);
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.right[i]);
              break;
            } else if (
              boardStatus[tempObject?.right[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Top Possible moves

          for (let i = 0; i < tempObject?.top?.length; i++) {
            if (boardStatus[tempObject?.top[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.top[i]);
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.top[i]);
              break;
            } else if (
              boardStatus[tempObject?.top[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding Bottom Possible moves

          for (let i = 0; i < tempObject?.bottom?.length; i++) {
            if (boardStatus[tempObject?.bottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottom[i]);
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding leftTop Possible moves

          for (let i = 0; i < tempObject?.leftTop?.length; i++) {
            if (boardStatus[tempObject?.leftTop[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.leftTop[i]);
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.leftTop[i]);
              break;
            } else if (
              boardStatus[tempObject?.leftTop[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding topRight Possible moves

          for (let i = 0; i < tempObject?.topRight?.length; i++) {
            if (boardStatus[tempObject?.topRight[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.topRight[i]);
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.topRight[i]);
              break;
            } else if (
              boardStatus[tempObject?.topRight[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding rightBottom Possible moves

          for (let i = 0; i < tempObject?.rightBottom?.length; i++) {
            if (boardStatus[tempObject?.rightBottom[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.rightBottom[i]);
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.rightBottom[i]);
              break;
            } else if (
              boardStatus[tempObject?.rightBottom[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }

          // Adding bottomLeft Possible moves

          for (let i = 0; i < tempObject?.bottomLeft?.length; i++) {
            if (boardStatus[tempObject?.bottomLeft[i]]?.occupiedBy == null) {
              tempMoves.push(tempObject?.bottomLeft[i]);
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType !==
              boardStatus[box]?.occupiedByType
            ) {
              tempMoves.push(tempObject?.bottomLeft[i]);
              break;
            } else if (
              boardStatus[tempObject?.bottomLeft[i]]?.occupiedByType ===
              boardStatus[box]?.occupiedByType
            ) {
              break;
            }
          }
        }
        if (boardStatus[box].occupiedBy == 'king' && box == 'E1') {
          // For A1 Castle
          let canBeCastled = true;
          tempObject?.castleA1ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleA1[0]);
          }
          // For H1 Castle
          canBeCastled = true;
          tempObject?.castleH1ClearPaths?.map((path: string) => {
            if (boardStatus[path].occupiedBy != null) {
              canBeCastled = false;
            }
          });
          if (canBeCastled) {
            tempMoves.push(tempObject?.castleH1[0]);
          }
        }
      }
    });

    possibleWhiteMoves = this.removeDuplicates(tempMoves);

    // Validity Logic
    if (possibleBlackMoves.includes(whiteKingPosition)) {
      whiteKingChecked = true;
    } else if (possibleWhiteMoves.includes(blackKingPosition)) {
      blackKingChecked = true;
    } else {
      whiteKingChecked = false;
      blackKingChecked = false;
    }

    if (
      whiteKingChecked == true &&
      playingAsWhite == true &&
      possibleBlackMoves.includes(whiteKingPosition) == true
    ) {
      validMove = false;
    } else if (
      blackKingChecked == true &&
      playingAsWhite == false &&
      possibleWhiteMoves.includes(blackKingPosition) == true
    ) {
      validMove = false;
    }

    return validMove;
  }
}
