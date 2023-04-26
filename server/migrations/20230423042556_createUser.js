exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.string("username").primary();
    table.string("password");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
