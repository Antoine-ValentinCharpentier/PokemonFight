import { Injectable, signal } from '@angular/core';
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
  ) {
    this.onHealthChange = this.onHealthChange.bind(this);
  }

  private _health = signal<number>(0);

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

  get health(): number {
    return this._health();
  }

  set health(hp: number) {
    console.log('new health', hp)
    this._health.set(hp);
  }

  onHealthChange(message: any): void {
    if (message.action !== 'healthUpdate') {
      return;
    }
    this._health.set(message.health);
  }
}
