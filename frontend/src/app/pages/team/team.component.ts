import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Pokemon } from '../../../type';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  pokedex: Pokemon[] = [];

  ngOnInit() {
    this.teamService.getPokedex().subscribe({
      next: (data: Pokemon[]) => {
        this.pokedex = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
