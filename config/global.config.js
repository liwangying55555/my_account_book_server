const isProd = process.env.NODE_ENV = 'production'

module.exports = {
  server: {
    host: '127.0.0.1',
    port: '1010',
  },
  database: {
    username: 'root',
    password: null,
    database: 'my_account',
    dialect: "mysql",
    logging: false
  }
}