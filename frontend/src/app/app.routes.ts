import { Routes } from '@angular/router';
import { TeamComponent } from './pages/team/team.component';
import { FightComponent } from './pages/fight/fight.component';
import { teamSelectedGuard } from './guards/team-selected.guard';

export const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
  },
  {
    path: 'fight',
    component: FightComponent,
    canActivate: [teamSelectedGuard]
  },
  { path: '**', redirectTo: '' },
];
