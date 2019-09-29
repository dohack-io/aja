exports.up = async knex => {
    await knex.schema.createTable("posts", t => {
        t.increments("id")
            .unsigned()
            .primary();
        t.integer("garden_id")
            .unsigned()
            .index();
        t.integer("author")
            .unsigned()
            .index();
        t.string("text", 510);
        t.timestamps(true, true);
        t.foreign("garden_id")
            .references("id")
            .inTable("gardens")
            .onDelete("cascade");
        t.foreign("author")
            .references("id")
            .inTable("users")
            .onDelete("cascade")
    });
};

exports.down = async knex => {
    await knex.schema.dropTable("posts");
};