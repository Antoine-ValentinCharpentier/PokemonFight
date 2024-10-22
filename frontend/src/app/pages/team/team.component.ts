import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Pokemon } from '../../../type';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  constructor(private teamService: TeamService, private toast: ToastrService) {}

  searchTermPokedex: string = '';

  pokedex: Pokemon[] = [];
  filteredPokedex: Pokemon[] = [];

  team: Pokemon[] = [];
  selectedIndexPokemonTeam: number = -1;

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

  onClickPokemonTeam(indexPokemon: number) {
    this.selectedIndexPokemonTeam = indexPokemon;
  }

  onClickPokemonPokedex(pokemon: Pokemon) {
    const index = this.team.indexOf(pokemon);
    if (index === -1) {
      if (this.selectedIndexPokemonTeam === -1) {
        if (this.team.length < 3) {
          this.team.push(pokemon);
        } else {
          this.toast.error(
            'If you want to replace a Pokémon from your team with another Pokémon from the Pokédex, please select a Pokémon of your current team.',
            'Team Full',
            {
              timeOut: 6000,
              closeButton: true,
              progressBar: true,
            }
          );
        }
      } else {
        if (this.team.length <= this.selectedIndexPokemonTeam) {
          this.team.push(pokemon);
        } else {
          this.team[this.selectedIndexPokemonTeam] = pokemon;
        }
      }
    } else {
      this.toast.error(
        'You cannot have two identical Pokémon in your team. Please select a different Pokémon.',
        'Duplicate Pokémon',
        {
          timeOut: 6000,
          closeButton: true,
          progressBar: true,
        }
      );
    }
  }
}
