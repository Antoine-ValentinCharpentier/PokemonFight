import { teamService } from "../services/teamService.js";

export class TeamController {
  postTeam(req, res) {
    const { team } = req.body;

    const validation = teamService.isTeamValid(team);

    if (validation.valid) {
      const team_id = teamService.saveTeam(team);
      return res.status(200).json({
        message: "Team is valid!",
        team_id: team_id,
      });
    } else {
      return res.status(400).json({ message: validation.message });
    }
  }
}

export const teamController = new TeamController();
