import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pokemon, TeamId } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private api: ApiService) {}

  team: Pokemon[] = [];
  teamId: string = "";

  getPokedex(): Observable<Pokemon[]> {
    return this.api.get<Pokemon[]>('pokedex', {});
  }

  uploadTeam(team: Pokemon[]): Observable<TeamId> {
    return this.api.post<TeamId>('team', { team }, {});
  }

  setTeam(team: Pokemon[]) {
    this.team = team;
  }

  getTeam() {
    return this.team;
  }
}
