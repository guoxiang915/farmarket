exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('Place', table => {
      table.dropColumn('ownership');
      table.renameColumn('user_id', 'creator_id');
      table.integer('owner_id').unsigned();
      table.foreign('owner_id').references('Users.id');
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('Place', table => {
      table.dropColumn('owner_id');
      table.renameColumn('creator_id', 'user_id');
      table.boolean('ownership');
    }),
  ]);
};
