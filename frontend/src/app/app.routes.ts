import { Routes } from '@angular/router';
import { TeamComponent } from './pages/team/team.component';
import { FightComponent } from './pages/fight/fight.component';

export const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
  },
  {
    path: 'fight',
    component: FightComponent,
  },
];
