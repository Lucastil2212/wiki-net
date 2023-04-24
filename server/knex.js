import knex from "knex";

export default db = knex({
  client: "pg",
  connection: {
    host: "postgres://zpidbsow:CThDcYQKfcwffXWUmS9xcsetlGhrrC8J@baasu.db.elephantsql.com/zpidbsow",
    port: "5432",
    user: "zpidbsow",
    password: "CThDcYQKfcwffXWUmS9xcsetlGhrrC8J",
    database: "wiki-net",
  },
});
