exports.up = function (knex) {
  return knex.schema.createTable("network", (table) => {
    table.string("network_name").primary();
    table.integer("user_name");
    table.string("notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("network");
};
