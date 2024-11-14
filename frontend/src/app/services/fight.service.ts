import { Injectable, signal } from '@angular/core';
import { MessageHealthUpdate, Pokemon } from '../../type';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root',
})
export class FightService {
  constructor(
    private api: ApiService,
    private wsService: WebsocketService,
    private teamService: TeamService
  ) {
    this.onHealthChange = this.onHealthChange.bind(this);
  }

  private _pokemon = signal<Pokemon | undefined>(undefined);

  initialize(): void {
    this.wsService.connect(this.teamService.teamId, this.onHealthChange);
  }

  getDefensivePokemon(): Observable<Pokemon> {
    return this.api.get<Pokemon>('fight/pokemon', {});
  }

  onAttack(): void {
    this.wsService.sendMessage({
      action: 'onAttack',
    });
  }

  get pokemon(): Pokemon | undefined {
    return this._pokemon();
  }

  set pokemon(pokemon: Pokemon) {
    this._pokemon.set(pokemon);
  }

  onHealthChange(message: MessageHealthUpdate): void {
    if (message.action !== 'healthUpdate') {
      return;
    }
    this._pokemon.update((pokemon) => {
      if(!pokemon){
        return pokemon;
      }
      const newPokemon = {...pokemon}
      newPokemon.stats.hp = message.health;
      return newPokemon
    })
  }
}
