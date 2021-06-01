exports.up = function(knex) {
  return knex.schema.table('Users', table => {
    table.dropColumn('linkedin');
    table.dropColumn('facebook');
    table.dropColumn('google');
    table.string('google_id');
    table.string('token_id');
    table.string('facebook_id');
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('Users', table => {
      table.dropColumn('facebook_id');
      table.dropColumn('token_id');
      table.dropColumn('google_id');
      table.string('google');
      table.string('facebook');
      table.string('linkedin');
    }),
  ]);
};
