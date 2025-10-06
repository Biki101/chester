import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app'; // For type definitions if needed, or error handling
// 🚨 Use the 'compat' path for the old Firebase structure
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

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
  private authSubscription: Subscription;
  private gamesCollection: AngularFirestoreCollection<GameData>;
  constructor(
    private authService: AuthserviceService,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.gamesCollection = this.firestore.collection<GameData>('games');
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe((user) => {
      this.user = user; // The 'user' here is the actual user object (or null)
      if (user) {
        console.log('User UID is:', user.uid);
        // You can perform synchronous actions here
        this.router.navigate(['welcome-page']);
      } else {
        console.log('User is logged out.');
      }
    });
  }

  ngOnDestroy() {
    // IMPORTANT: Always unsubscribe to prevent memory leaks
    this.authSubscription.unsubscribe();
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
      boardState: this.initialBoardState(),
      turn: 'white',
      status: 'waiting',
      moves: [], // Include the new moves array
    };

    const docRef = await this.gamesCollection.add(newGameData);
    return docRef.id;
  }

  private initialBoardState(): any {
    // ... initial board setup logic ...
    return {
      boardStatus: null,
      playingAsWhite: null,
      A1RookKingCastleWhite: null,
      H1RookKingCastleWhite: null,
      A8RookKingCastleBlack: null,
      H8RookKingCastleBlack: null,
      selectedBox: null,
      possibleMoves: null,
      possibleBlackMoves: null,
      possibleWhiteMoves: null,
      pawnBlackForwardMoves: null,
      pawnWhiteForwardMoves: null,
      pawnBlackForwardMovesRepeated: null,
      pawnWhiteForwardMovesRepeated: null,
      blackKingPosition: null,
      whiteKingPosition: null,
      movedFrom: null,
      movedTo: null,
      gameDraw: null,
      whiteWon: null,
      blackWon: null,
      capturedWhiteList: null,
      capturedBlackList: null,
      blackKingChecked: null,
      whiteKingChecked: null,
    };
  }
}
