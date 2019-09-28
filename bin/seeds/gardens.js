exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("gardens")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gardens").insert([
        {
          id: 1,
          team_id: 1,
          longitude: 7.465897,
          latitude: 51.497679
        },
        {
          id: 2,
          longitude: 7.522553,
          latitude: 51.518319
        }
      ]);
    });
};
