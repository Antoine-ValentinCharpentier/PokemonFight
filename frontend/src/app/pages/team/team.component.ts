import { Component, OnInit, signal } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Pokemon, TeamId } from '../../../type';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private toast: ToastrService,
    private router: Router
  ) {}

  searchTermPokedex = signal<string>('');

  pokedex: Pokemon[] = [];
  filteredPokedex = signal<Pokemon[]>([]);

  team = signal<Pokemon[]>([]);
  selectedIndexPokemonTeam = signal<number>(-1);

  canSubmitTeam = signal<boolean>(false);

  ngOnInit() {
    this.teamService.getPokedex().subscribe({
      next: (data: Pokemon[]) => {
        this.pokedex = data;
        this.filteredPokedex.set(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearchTermChange() {
    if (this.searchTermPokedex) {
      this.filteredPokedex.set(
        this.pokedex.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(this.searchTermPokedex().toLowerCase())
        )
      );
    } else {
      this.filteredPokedex.set(this.pokedex);
    }
  }

  onClickPokemonTeam(indexPokemon: number) {
    this.selectedIndexPokemonTeam.set(indexPokemon);
  }

  onClickPokemonPokedex(pokemon: Pokemon) {
    const index = this.team().indexOf(pokemon);
    if (index !== -1) {
      this.toast.error(
        'You cannot have two identical Pokémon in your team. Please select a different Pokémon.',
        'Duplicate Pokémon',
        {
          timeOut: 6000,
          closeButton: true,
          progressBar: true,
        }
      );
      return;
    }
    if (this.selectedIndexPokemonTeam() === -1) {
      if (this.team().length >= 3) {
        this.toast.error(
          'If you want to replace a Pokémon from your team with another Pokémon from the Pokédex, please select a Pokémon of your current team.',
          'Team Full',
          {
            timeOut: 6000,
            closeButton: true,
            progressBar: true,
          }
        );
        return;
      }
      this.team.set([...this.team(), pokemon]);
      if (this.team().length === 3) {
        this.canSubmitTeam.set(true);
      }
    } else {
      if (this.team().length <= this.selectedIndexPokemonTeam()) {
        this.team.set([...this.team(), pokemon]);
      } else {
        const updatedTeam = this.team().map((p, index) =>
          index === this.selectedIndexPokemonTeam() ? pokemon : p
        );
        this.team.set(updatedTeam);
      }
    }
  }

  isTeamValid(): boolean {
    if (this.team().length !== 3) {
      this.toast.error(
        'Your team must have exactly 3 Pokémon.',
        'Invalid Team Size',
        {
          timeOut: 6000,
          closeButton: true,
          progressBar: true,
        }
      );
      return false;
    }

    const names = this.team().map((pokemon) => pokemon?.name);
    const uniqueNames = new Set(names);

    if (uniqueNames.size !== names.length) {
      this.toast.error(
        'Each Pokémon in your team must be unique.',
        'Duplicate Pokémon Found',
        {
          timeOut: 6000,
          closeButton: true,
          progressBar: true,
        }
      );
      return false;
    }

    return true;
  }

  submitTeam() {
    if (!this.isTeamValid()) {
      this.toast.error('Your team is invalid', '', {
        timeOut: 6000,
        closeButton: true,
        progressBar: true,
      });
      return;
    }
    this.teamService.uploadTeam(this.team()).subscribe({
      next: (data: TeamId) => {
        this.teamService.setTeam(this.team());
        this.teamService.teamId = data.team_id;
        this.router.navigate(['/fight']);
      },
      error: (error) => {
        this.toast.error('Failed upload Team', '', {
          timeOut: 6000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }
}
