import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export enum PokemonType {
  Normal = "normal",
  Fighting = "fighting",
  Flying = "flying",
  Poison = "poison",
  Ground = "ground",
  Rock = "rock",
  Bug = "bug",
  Ghost = "ghost",
  Steel = "steel",
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Psychic = "psychic",
  Ice = "ice",
  Dragon = "dragon",
  Dark = "dark",
  Fairy = "fairy",
  Unknown = "unknown",
  Shadow = "shadow",
}

export interface PokemonMove {
  name: string;
  damage: number;
  type: PokemonType;
}

export interface Pokemon {
  name: string;
  types: PokemonType[];
  image_url: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
  moves: {
      weak: PokemonMove,
      medium: PokemonMove,
      strong: PokemonMove
  }
}
