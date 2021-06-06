exports.up = function(knex) {
  return knex.schema.table('Farm', table => {
    table.json('farm_share');
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('Farm', table => {
      table.dropColumn('farm_share');
    }),
  ]);
};
