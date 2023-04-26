exports.up = function (knex) {
  return knex.schema.createTable("network", (table) => {
    table.string("network_name").primary();
    table.string("user_name").primary();
    table.json("data");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("network");
};
