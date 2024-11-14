import { Component, OnInit, signal } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FightService } from '../../services/fight.service';
import { FightDefensivePokemon, Pokemon } from '../../../type';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-fight',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.scss',
})
export class FightComponent implements OnInit {
  constructor(public fightService: FightService, public teamService: TeamService) {}

  defensivePokemon = signal<Pokemon | undefined>(undefined);

  ngOnInit(): void {
    this.fightService.initialize();
    this.fightService.getDefensivePokemon().subscribe({
      next: (data: FightDefensivePokemon) => {
        this.defensivePokemon.set(data.pokemon)
        this.fightService.health = data.health;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onAttack(): void {
    this.fightService.onAttack();
  }
}
