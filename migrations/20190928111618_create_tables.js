exports.up = async knex => {
  await knex.schema.createTable("users", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("surname").notNull();
    t.string("email").notNull();
    t.string("password").notNull();
    t.boolean("verified")
      .notNull()
      .defaultTo(false);
    t.timestamps(true, true);
  });
  await knex.schema.createTable("gardens", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("team_id")
      .unsigned()
      .index();
    t.timestamps(true, true);
    t.foreign("team_id")
      .references("id")
      .inTable("teams");
  });
  await knex.schema.createTable("teams", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.timestamps(true, true);
  });
  await knex.schema.createTable("teammates", t => {
    t.index("team_id")
      .unsigned()
      .primary();
    t.index("user_id").unsigned();
    t.timestamps(true, true);
    t.foreign("team_id")
      .references("id")
      .inTable("teams");
    t.foreign("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("gardens");
  await knex.schema.dropTable("teams");
  await knex.schema.dropTable("teammates");
};
