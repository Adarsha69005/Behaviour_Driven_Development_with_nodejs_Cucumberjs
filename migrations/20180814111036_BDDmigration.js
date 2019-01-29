
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('users', function (table) {
          table.uuid('userid').primary();
          table.string('username').notNullable();
          table.string('name');
          table.specificType('created_at', 'timestamp(0)').defaultTo(null);
      })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};
