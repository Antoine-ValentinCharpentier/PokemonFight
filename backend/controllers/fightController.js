import { fightService } from "../services/fightService.js";
import { teamService } from "../services/teamService.js";

export class FightController {
  getDefensivePokemon(req, res) {
    const defensivePokemon = fightService.getDefensivePokemon();
    if (defensivePokemon) {
      return res.status(200).json(defensivePokemon);
    } else {
      return res.status(500).json({ message: "Defensive pokemon not defined" });
    }
  }

  handleOnAttack(teamId) {
    const team = teamService.getTeamById(teamId);
    let newHealth = fightService.getDefensivePokemon().stats.hp;
    team.forEach((pokemon) => {
      newHealth = fightService.handleReceiveDamage(pokemon, "weak");
    });
    return newHealth;
  }
}

export const fightController = new FightController();
