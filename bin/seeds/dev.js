require("dotenv").config();
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("teammates").del();
  await knex("gardens").del();
  await knex("users").del();
  await knex("teams").del();
  const users = await knex("users")
    .returning("id")
    .insert([
      {
        name: "Niklas",
        surname: "Eicker",
        email: "test@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      },
      {
        name: "Jon",
        surname: "Doe",
        email: "test2@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      },
      {
        name: "Jane",
        surname: "Doe",
        email: "test3@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      }
    ]);
  const teams = await knex("teams")
    .returning("id")
    .insert([
      {
        name: "Pokemon FTW"
      }
    ]);
  await knex("gardens")
    .insert([
      {
        team_id: teams[0],
        longitude: 7.465897,
        latitude: 51.497679
      },
      {
        longitude: 7.522553,
        latitude: 51.518319
      }
    ]);
  await knex("teammates")
    .insert([
      {
        team_id: teams[0],
        user_id: users[0]
      },
      {
        team_id: teams[0],
        user_id: users[1]
      }
    ]);
};
