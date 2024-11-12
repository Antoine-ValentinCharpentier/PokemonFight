import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { AsyncPipe } from '@angular/common';
import { FightService } from '../../services/fight.service';
import { FightDefensivePokemon, Pokemon } from '../../../type';

@Component({
  selector: 'app-fight',
  standalone: true,
  imports: [PokemonCardComponent, AsyncPipe],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.scss',
})
export class FightComponent implements OnInit {
  constructor(private fightService: FightService) {}

  defensivePokemon: Pokemon | null = null;
  currentHealth: number = 0;

  ngOnInit(): void {
    this.fightService.initialize();
    this.fightService.getDefensivePokemon().subscribe({
      next: (data: FightDefensivePokemon) => {
        this.defensivePokemon = data.pokemon
        this.currentHealth = data.health
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.currentHealth = this.fightService.health;
  }

  onAttack(): void {
    console.log('ATTACK');
    this.fightService.onAttack();
  }
}
