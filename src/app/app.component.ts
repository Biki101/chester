import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['login']);
  }
}
