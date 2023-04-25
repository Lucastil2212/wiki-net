exports.up = function (knex) {
  return knex.schema.createTable("network", (table) => {
    table.increments("node_id").primary();
    table.integer("user_id");
    table.string("node_name");
    table.string("notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("network");
};
