// Update with your config settings.
var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {

  development: {
    client: process.env.knex_client,
    connection: {
      host : process.env.knex_conn_host,
      database: process.env.knex_conn_db,
      port: process.env.knex_conn_port,
      user: process.env.knex_conn_user,
      password: process.env.knex_conn_password
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
