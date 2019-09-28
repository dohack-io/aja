exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Niklas",
          surname: "Eicker",
          email: "test@example.com",
          password:
            "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
        },
        {
          id: 2,
          name: "Jon",
          surname: "Doe",
          email: "test@example.com",
          password:
            "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
        },
        {
          id: 3,
          name: "Jane",
          surname: "Doe",
          email: "test@example.com",
          password:
            "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
        }
      ]);
    });
};
