exports.up = (knex) =>
  knex.schema.createTable("favorites", (table) => {
    table.increments("favorites_id");

    table.integer("dish_id").references("dish_id").inTable("dishes");
    table.integer("user_id").references("user_id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("favorites");
