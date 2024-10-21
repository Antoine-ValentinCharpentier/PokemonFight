import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private api: ApiService) {}

  getPokedex(): Observable<Pokemon[]> {
    return this.api.get<Pokemon[]>('pokedex', {});
  }
}
