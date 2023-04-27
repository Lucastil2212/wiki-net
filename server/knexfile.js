require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://zpidbsow:CThDcYQKfcwffXWUmS9xcsetlGhrrC8J@baasu.db.elephantsql.com/zpidbsow",
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
    pool: {
      min: 2,
      max: 10,
    },
  },

  testing: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./data/seeds" },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
};
