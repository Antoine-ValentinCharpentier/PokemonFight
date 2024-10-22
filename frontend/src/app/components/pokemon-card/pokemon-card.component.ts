import { Component, Input } from '@angular/core';
import { Pokemon, PokemonType } from '../../../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | null = null;
  
  @Input() cliquable: boolean = false;
  @Input() selected: boolean = false;

  typeColor: { [key in PokemonType]?: string } = {
    [PokemonType.Bug]: "#26de81",
    [PokemonType.Dragon]: "#ffeaa7",
    [PokemonType.Electric]: "#fed330",
    [PokemonType.Fairy]: "#FF0069",
    [PokemonType.Fighting]: "#30336b",
    [PokemonType.Fire]: "#f0932b",
    [PokemonType.Flying]: "#81ecec",
    [PokemonType.Grass]: "#00b894",
    [PokemonType.Ground]: "#EFB549",
    [PokemonType.Ghost]: "#a55eea",
    [PokemonType.Ice]: "#74b9ff",
    [PokemonType.Normal]: "#95afc0",
    [PokemonType.Poison]: "#6c5ce7",
    [PokemonType.Psychic]: "#a29bfe",
    [PokemonType.Rock]: "#63340B",
    [PokemonType.Water]: "#0190FF",
    [PokemonType.Dark]: "#2d3436"
  };

  getTypeColor(type: PokemonType): string {
    return this.typeColor[type] || '#ffffff';
  }
}
