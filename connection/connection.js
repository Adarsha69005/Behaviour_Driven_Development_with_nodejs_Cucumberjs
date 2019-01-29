'use strict'

var env = require('node-env-file');
const env_file_name=__dirname + '/../.env'
env(env_file_name);
var pg = require('pg')

try {
    var knex = require('knex')({
        client: process.env.knex_client,
        connection: {
            host : process.env.knex_conn_host,
            database: process.env.knex_conn_db,
            user:     process.env.knex_conn_user,
            password: process.env.knex_conn_password,
            port: process.env.knex_conn_port ? process.env.knex_conn_port : 5432
        }
    });
} catch (error) {
    console.log(error);
}

module.exports = knex;