import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from './services/authservice.service';
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

  ngOnInit() {}
}
