import { Injectable } from '@angular/core';
import { FightDefensivePokemon } from '../../type';
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
  ) {}

  health: number = 0;

  initialize(): void {
    console.log('Initializing FightService');
    this.wsService.connect(this.teamService.teamId, this.onHealthChange);
  }

  getDefensivePokemon(): Observable<FightDefensivePokemon> {
    return this.api.get<FightDefensivePokemon>('fight/pokemon', {});
  }

  onAttack(): void {
    this.wsService.sendMessage({
      action: 'onAttack',
    });
  }

  setHealth(health: number) {
    this.health = health;
  }

  onHealthChange(message: any): void {
    if (message.action !== 'healthUpdate') {
      return;
    }
    this.health = message.health;
  }
}
