exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("dish_id");

    table.text("title").notNullable();
    table.text("image").notNullable();
    table.text("description").notNullable();
    table.text("category").notNullable();

    table.decimal("price", 8, 2).notNullable(); // 8 é o número total de dígitos e 2 é o número de casas decimais

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
