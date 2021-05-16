exports.up = function(knex) {
  return knex.schema.table('Place', table => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.foreign('user_id').references('Users.id');
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('Place', table => {
      table.dropColumn('user_id');
    }),
  ]);
};
