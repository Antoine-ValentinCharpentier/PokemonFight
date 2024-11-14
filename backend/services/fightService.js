import { pokedexService } from "./pokedexService.js";

const typeEffectiveness = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, ice: 1, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, fairy: 2 },
    fairy: { fighting: 2, poison: 0.5, steel: 0.5, dragon: 2, dark: 2 }
};

export class FightService {
    constructor(niveau = 100) {
        this.pokemon = pokedexService.getRandomPokemon();
        this.pokemon.stats.hp = this.pokemon.stats.hp * 10_000;
        this.niveau = niveau;
    }

    getDefensivePokemon() {
        return this.pokemon;
    }

    calculateTypeEffectiveness(attackType, defenderTypes) {
        return defenderTypes.reduce((multiplier, type) => {
            return multiplier * (typeEffectiveness[attackType]?.[type] || 1);
        }, 1);
    }

    handleReceiveDamage(attacker, moveName) {
        if (!attacker || !moveName || !Object.keys(attacker.moves).includes(moveName)) {
            return;
        }
        
        const move = attacker.moves[moveName]

        const attackPower = attacker.stats.attack;
        const defensePower = this.pokemon.stats.defense;
        const movePower = move.damage;
        const attackType = move.type;
        const defenderTypes = this.pokemon.types;

        const stab = attacker.types.includes(attackType) ? 1.5 : 1;

        const typeEffectivenessMultiplier = this.calculateTypeEffectiveness(attackType, defenderTypes);
        const randomFactor = 0.85 + Math.random() * 0.15;

        const baseDamage = (((2 * this.niveau / 5 + 2) * attackPower * movePower) / (defensePower * 50) + 2);
        const damage = Math.floor(baseDamage * stab * typeEffectivenessMultiplier * randomFactor);

        const currentHealth = this.pokemon.stats.hp;
        this.pokemon.stats.hp = Math.max(0, currentHealth - damage);

        return this.pokemon.stats.hp
    }
}

export const fightService = new FightService()