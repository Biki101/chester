import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app'; // For type definitions if needed, or error handling
// 🚨 Use the 'compat' path for the old Firebase structure
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UtilsService } from 'src/app/services/utils.service';

// Define the type of data for clarity
interface GameData {
  players: { white: string; black: string | null };
  boardState: any;
  turn: 'white' | 'black';
  status: 'waiting' | 'playing' | 'finished';
  moves: string[];
}
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  showPlayAsOption: boolean = false;
  user: firebase.User | null;
  waitingGamesList$: any = null;
  private authSubscription: Subscription;
  private gamesCollection: AngularFirestoreCollection<GameData>;
  constructor(
    private authService: AuthserviceService,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private utilService: UtilsService
  ) {
    this.gamesCollection = this.firestore.collection<GameData>('games');
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe((user) => {
      this.user = user; // The 'user' here is the actual user object (or null)
      if (user) {
        console.log('User UID is:', user.uid);
        // perform synchronous actions here
        this.router.navigate(['welcome-page']);
      } else {
        console.log('User is logged out.');
      }
    });

    this.getWaitingGames();

    this.resumeGame();
  }

  ngOnDestroy() {
    // IMPORTANT: Always unsubscribe to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  resumeGame() {
    this.waitingGamesList$.subscribe((data) => {
      console.log(data);
      data?.map((game: any) => {
        if (
          game?.players?.black == this.user.uid ||
          game?.players?.white == this.user.uid
        ) {
          this.router.navigate(['multiplayer'], {
            queryParams: {
              gameId: game?.id,
            },
          });
        }
      });
    });
  }

  getWaitingGames() {
    this.waitingGamesList$ = this.firestore
      .collection<GameData>('games', (ref) =>
        ref.where('status', '==', 'waiting')
      )
      .valueChanges({ idField: 'id' });
  }

  onSignOut() {
    this.authService.signOut();
  }

  onPassAndPlayMode() {
    this.router.navigate(['pass-n-play']);
  }

  async onCreateRoomClick(playAsblack: boolean) {
    // Use the pre-initialized collection reference (this.gamesCollection)
    const newGameData: GameData = {
      players: {
        white: playAsblack ? null : this.user.uid,
        black: playAsblack ? this.user.uid : null,
      },
      boardState: this.initialBoardState(playAsblack),
      turn: 'white',
      status: 'waiting',
      moves: [], // Include the new moves array
    };

    const docRef = await this.gamesCollection.add(newGameData);
    //  docRef.id;

    this.router.navigate(['multiplayer'], {
      queryParams: {
        gameId: docRef.id,
      },
    });
  }

  private initialBoardState(playAsblack: boolean): any {
    // ... initial board setup logic ...
    return {
      boardStatus: this.utilService.initialBoardState,
      playingAsWhite: playAsblack ? false : true,
      A1RookKingCastleWhite: true,
      H1RookKingCastleWhite: true,
      A8RookKingCastleBlack: true,
      H8RookKingCastleBlack: true,
      selectedBox: null,
      possibleMoves: [],
      possibleBlackMoves: [],
      possibleWhiteMoves: [],
      pawnBlackForwardMoves: [],
      pawnWhiteForwardMoves: [],
      pawnBlackForwardMovesRepeated: [],
      pawnWhiteForwardMovesRepeated: [],
      blackKingPosition: 'E8',
      whiteKingPosition: 'E1',
      movedFrom: '',
      movedTo: '',
      gameDraw: false,
      whiteWon: false,
      blackWon: false,
      capturedWhiteList: [],
      capturedBlackList: [],
      blackKingChecked: false,
      whiteKingChecked: false,
    };
  }
}
