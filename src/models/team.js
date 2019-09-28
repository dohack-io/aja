const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class Team {
  constructor(data) {
    this.name = data.name;
    this.owner = data.owner;
  }

  async save() {
    if (!this.name) {
      throw new ValidationError("Missing team name");
    }
    if (isNaN(this.owner) || this.owner < 0) {
      throw new ValidationError("Invalid owner ID");
    }
    const res = await knex
      .insert({
        name: this.name
      })
      .into("teams");
    await knex
      .insert({
        team_id: res[0],
        user_id: this.owner
      })
      .into("teammates");
    return res[0];
  }

  static async getNameById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid team ID");
    }
    const team = await knex("teams")
      .select()
      .where("id", id)
      .first();
    return team;
  }

  static async getTeamMatesById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid team ID");
    }
    const teammates = await knex("teammates")
      .select()
      .where("team_id", id);
    return teammates;
  }
}

module.exports = Team;
