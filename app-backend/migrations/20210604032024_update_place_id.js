const { v4: uuid } = require('uuid');

exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('Place', table => {
      table.dropColumn('id');
      table
        .uuid('place_id')
        .defaultTo(uuid())
        .notNullable();
      // .primary();
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('Place', table => {
      table.dropColumn('place_id');
      table
        .increments('id')
        .notNullable()
        .primary();
    }),
  ]);
};
