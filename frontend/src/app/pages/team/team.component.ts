import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Pokemon, TeamId } from '../../../type';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmptyCardComponent } from '../../components/empty-card/empty-card.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    PokemonCardComponent,
    CommonModule,
    FormsModule,
    EmptyCardComponent,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  constructor(
    public teamService: TeamService,
    private toast: ToastrService,
    private router: Router
  ) {}

  searchTermPokedex = signal<string>('');

  pokedex: Pokemon[] = [];
  filteredPokedex = signal<Pokemon[]>([]);

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
    const index = this.teamService.team().indexOf(pokemon);
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
      if ( this.teamService.team().length >= 3) {
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
      this.teamService.team.set([... this.teamService.team(), pokemon]);
      if ( this.teamService.team().length === 3) {
        this.canSubmitTeam.set(true);
      }
    } else {
      if ( this.teamService.team().length <= this.selectedIndexPokemonTeam()) {
        this.teamService.team.set([... this.teamService.team(), pokemon]);
        if ( this.teamService.team().length === 3) {
          this.canSubmitTeam.set(true);
        }
      } else {
        const updatedTeam =  this.teamService.team().map((p, index) =>
          index === this.selectedIndexPokemonTeam() ? pokemon : p
        );
        this.teamService.team.set(updatedTeam);
      }
    }
  }

  submitTeam() {
    const validateTeam = this.teamService.validateTeam();
    if (!validateTeam.isValid) {
      this.toast.error(validateTeam.errorMessage, validateTeam.errorTitle, {
        timeOut: 6000,
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    this.teamService.uploadTeam().subscribe({
      next: (data: TeamId) => {
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
