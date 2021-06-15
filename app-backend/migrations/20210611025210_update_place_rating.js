exports.up = function(knex) {
  return knex.schema.table('Place', table => {
    table.integer('rating').defaultTo(0);
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('Place', table => {
      table.dropColumn('rating');
    }),
  ]);
};
