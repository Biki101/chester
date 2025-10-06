import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PassNPlayComponent } from './pages/pass-n-play/pass-n-play.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { MultiplayerComponent } from './pages/multiplayer/multiplayer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'pass-n-play',
    component: PassNPlayComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'welcome-page',
    component: WelcomePageComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'multiplayer',
    component: MultiplayerComponent,
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
