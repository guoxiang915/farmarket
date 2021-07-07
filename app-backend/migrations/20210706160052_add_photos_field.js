exports.up = function(knex) {
  return knex.schema.table('Place', table => {
    table.json('photos');
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('Place', table => {
      table.dropColumn('photos');
    }),
  ]);
};
