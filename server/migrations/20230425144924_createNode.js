exports.up = function (knex) {
  return knex.schema.createTable("node", (knex) => {
    knex.string("node_name").primary();
    knex.integer("network_name").primary();
    knex.string("notes");
    knex.integer("to");
    knex.integer("from");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("node");
};
