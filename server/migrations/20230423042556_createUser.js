/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  knex.schema.createTable("user", (table) => {
    table.increments("user_id");
    table.string("username");
    table.string("password");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("user");
};
