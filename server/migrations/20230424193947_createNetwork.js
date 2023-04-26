exports.up = function (knex) {
  return knex.schema.createTable("network", (table) => {
    table.string("network_name");
    table.string("user_name");
    table.json("data");
    table.primary(["network_name", "user_name"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("network");
};
