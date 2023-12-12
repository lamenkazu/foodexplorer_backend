exports.up = (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("ingredient_id");
    table.text("name").notNullable();

    table
      .integer("dish_id")
      .references("dish_id")
      .inTable("dishes")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("ingredients");
