require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL || {
      host: process.env.DB_URL,
      database: process.env.DB_USER,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
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
