import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TeamService } from '../services/team.service';

export const teamSelectedGuard: CanActivateFn = (route, state) => {
  const teamService = inject(TeamService);
  const router = inject(Router);

  if(teamService.validateTeam().isValid){
    return true;
  }
  
  router.navigate(['/']);
  return false;
};
