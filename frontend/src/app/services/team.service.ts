import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pokemon, TeamId } from '../../type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  api = inject(ApiService)

  team = signal<Pokemon[]>([]);
  teamId: string = "";

  getPokedex(): Observable<Pokemon[]> {
    return this.api.get<Pokemon[]>(environment.api.endpoint.pokedex, {});
  }

  uploadTeam(): Observable<TeamId> {
    return this.api.post<TeamId>(environment.api.endpoint.uploadTeam, { team: this.team() }, {});
  }

  validateTeam() {
    if (this.team().length !== 3) {
      return { 
        isValid: false, 
        errorTitle: 'Invalid Team Size', 
        errorMessage: 'Your team must have exactly 3 Pokémon.' 
      };
    }
  
    const names = this.team().map((pokemon) => pokemon?.name);
    const uniqueNames = new Set(names);
  
    if (uniqueNames.size !== names.length) {
      return { 
        isValid: false, 
        errorTitle: 'Duplicate Pokémon Found', 
        errorMessage: 'Each Pokémon in your team must be unique.' 
      };
    }
  
    return { isValid: true };
  }
}
