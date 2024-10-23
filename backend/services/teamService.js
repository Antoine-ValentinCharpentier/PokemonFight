import { v4 as uuidv4 } from "uuid";

export class TeamService {
  constructor() {
    this.teams = new Map();
  }

  isTeamValid(team) {
    if (team.length !== 3) {
      return {
        valid: false,
        message: "Your team must have exactly 3 Pokémon.",
      };
    }

    const names = team.map((pokemon) => pokemon.name);
    const uniqueNames = new Set(names);

    if (uniqueNames.size !== names.length) {
      return {
        valid: false,
        message: "Each Pokémon in your team must be unique.",
      };
    }

    return { valid: true };
  }

  saveTeam(team) {
    const team_id = uuidv4();
    this.teams.set(team_id, team);
    return team_id;
  }

  getTeamById(team_id) {
    return this.teams.get(team_id);
  }

  getTeams() {
    return Array.from(this.teams.entries());
  }
}

export const teamService = new TeamService();
