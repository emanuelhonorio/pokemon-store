module.exports = {
  username: 'postgres',
  password: 'docker',
  database: 'pokemonstore',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}