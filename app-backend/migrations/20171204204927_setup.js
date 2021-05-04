exports.up = function(knex) {
  return knex.schema.createTable('Users', table => {
    table
      .increments('id')
      .notNullable()
      .primary();
    table.string('first_name');
    table.string('last_name');
    table
      .string('email')
      .notNull()
      .unique();
    table.string('password');
    table.string('google');
    table.string('facebook');
    table.string('linkedin');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists('Users')]);
};
