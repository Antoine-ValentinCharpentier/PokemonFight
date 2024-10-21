import fetch from 'node-fetch'; 
import fs from 'fs/promises';  

import { pathPokedex } from '../config.js';

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonData = async (id) => {
    const response = await fetch(`${POKE_API_BASE_URL}${id}`);
    const data = await response.json();

    const types = data.types.map(typeInfo => typeInfo.type.name);

    const stats = {
        hp: data.stats.find(stat => stat.stat.name === "hp").base_stat,
        attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
        defense: data.stats.find(stat => stat.stat.name === "defense").base_stat
    };

    const damagingMoves = data.moves
        .map(moveInfo => moveInfo.move.url)
        .slice(0, 20);

    const movesDetails = await Promise.all(
        damagingMoves.map(async url => {
            const moveResponse = await fetch(url);
            const moveData = await moveResponse.json();

            if (moveData.power) {
                return {
                    name: moveData.name,
                    damage: moveData.power,
                    type: moveData.type.name
                };
            }
            return null;
        })
    );

    const validMoves = movesDetails.filter(move => move !== null);
    const sortedMoves = validMoves.sort((a, b) => a.damage - b.damage);

    return {
        name: data.name,
        types: types,
        image_url: data.sprites.front_default,
        stats: stats,
        moves: {
            weak: sortedMoves[0] || { name: "Tackle", damage: 40, type: "Normal" },
            medium: sortedMoves[Math.floor(sortedMoves.length / 2)] || { name: "Quick Attack", damage: 60, type: "Normal" },
            strong: sortedMoves[sortedMoves.length - 1] || { name: "Hyper Beam", damage: 150, type: "Normal" }
        }
    };
};

const buildPokemonDatabase = async (limit = 100) => {
    const pokemonList = [];

    for (let i = 1; i <= limit; i++) {
        try {
            const pokemonData = await getPokemonData(i);
            pokemonList.push(pokemonData);
        } catch (error) {
            console.error(`Erreur lors de la récupération des données du Pokémon avec l'ID ${i}:`, error);
        }
    }

    return pokemonList;
};

const saveToFile = async (data, filename) => {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Données sauvegardées dans ${filename}`);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du fichier:", error);
    }
};

const main = async () => {
    const pokemonDB = await buildPokemonDatabase(200);
    await saveToFile(pokemonDB, pathPokedex);
};

try {
    await fs.access(pathPokedex);
} catch (error) {
    console.log('Downloading the pokedex !');
    await main(); 
}