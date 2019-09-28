module.exports = {
  development: {
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "dev.sqlite3"
    },
    seeds: {
      directory: "./bin/seeds"
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
