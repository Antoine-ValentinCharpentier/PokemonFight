import { Component, OnInit, signal } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FightService } from '../../services/fight.service';
import { Pokemon } from '../../../type';
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

  ngOnInit(): void {
    this.fightService.initialize();
    this.fightService.getDefensivePokemon().subscribe({
      next: (pokemon: Pokemon) => {
        this.fightService.pokemon = pokemon;
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
