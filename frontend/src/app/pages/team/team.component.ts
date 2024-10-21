import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Pokemon } from '../../../type';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  searchTermPokedex: string = '';

  pokedex: Pokemon[] = [];
  filteredPokedex: Pokemon[] = [];

  ngOnInit() {
    this.teamService.getPokedex().subscribe({
      next: (data: Pokemon[]) => {
        this.pokedex = data;
        this.filteredPokedex = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearchTermChange() {
    if (this.searchTermPokedex) {
      this.filteredPokedex = this.pokedex.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(this.searchTermPokedex.toLowerCase())
      );
    } else {
      this.filteredPokedex = this.pokedex;
    }
  }
}
