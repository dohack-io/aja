const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");
const GpsUtilities = require("../lib/gpsUtilities");
const logger = require("../logger");
const httpContext = require("express-http-context");

class Garden {
  constructor(data) {
    this.langitude = data.langitude;
    this.latitude = data.latitude;
  }

  async save() {
    if (
      this.langitude === undefined ||
      this.latitude === undefined ||
      isNaN(this.langitude) ||
      isNaN(this.latitude) ||
      this.langitude > 90 ||
      this.langitude < -90 ||
      this.latitude > 90 ||
      this.latitude < -90
    ) {
      throw new ValidationError("Invalid location");
    }
    const res = await knex
      .returning("id")
      .insert({
        langitude: this.langitude,
        latitude: this.latitude
      })
      .into("gardens");
    return res[0];
  }

  static async update(id, data) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid garden ID");
    }
    console.log(data)
    const garden = await knex("gardens")
      .where("id", id)
      .update(data, ["id", "team_id", "longitude", "latitude", "created_at", "updated_at"]);
    return garden[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid garden ID");
    }
    const garden = await knex("gardens")
      .select()
      .where("id", id)
      .first();
    return garden;
  }

  static async ofTeam(team_id) {
    if (isNaN(team_id) || team_id < 0) {
      throw new ValidationError("Invalid team ID");
    }
    const gardens = await knex("gardens")
      .select()
      .where("team_id", team_id);
    return gardens;
  }

  // ToDo: !!
  static async closeTo(gps) {
    // if (isNaN(gps.langitude) || isNaN(gps.latitude)) {
    //   throw new ValidationError("Invalid location");
    // }
    const gardens = await knex("gardens").select();
    return gardens;
  }

  static async inRadius(search) {
    const angularRadius = new Number(GpsUtilities.toAngularRadius(search.radius));
    const [latitude, longitude] = GpsUtilities.gpsToRad([
      search.latitude,
      search.longitude
    ]);
    logger.info("Searching in radius", null, {
      reqId: httpContext.get("reqId"),
      ...search,
      latitudeRad: latitude,
      longitudeRad: longitude,
      angularRadius
    });
    const gardens = knex("gardens")
      .select()
      .groupBy('id')
      .where(function() {
        this.where(function () {
          this.whereRaw("radians(??) > ?", ["latitude", new Number(latitude) - angularRadius]).andWhereRaw(
            "radians(??) < ?",
            ["latitude", new Number(latitude) + angularRadius]
          );
        }).andWhere(function () {
          this.whereRaw("radians(??) > ?", ["longitude", new Number(longitude) - angularRadius]).andWhereRaw(
            "radians(??) < ?",
            ["longitude", new Number(longitude) + angularRadius]
          );
        });
      })
      .havingRaw(`acos(sin(${latitude}) * sin(radians(??)) + cos(${latitude}) * cos(radians(??)) * cos(radians(??) - (${longitude}))) < ${angularRadius}`, ["latitude", "latitude", "longitude"]);
    return gardens;
  }
}

module.exports = Garden;
