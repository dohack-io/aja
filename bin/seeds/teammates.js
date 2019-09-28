exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("teams")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("teammates").insert([
        {
          team_id: 1,
          user_id: 1
        },
        {
          team_id: 1,
          user_id: 2
        }
      ]);
    });
};
