exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('Place', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table.string('name').notNullable();
      table.string('bio');
      table.string('category').notNull();
      table.json('location');
      table.boolean('containing');
      table.json('other_location');
      table.json('hours');
      table.string('facebook_url');
      table.string('order_url');
      table.boolean('ownership');
    }),
    knex.schema.createTable('FarmShare', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
      table.string('type').notNullable();
      table.json('contents');
      table.string('pay_period');
      table.float('payment');
      table.string('pay_method');
    }),
    knex.schema.createTable('Farm', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
      table.json('pickup_location');
      table.json('volunteer_hours');
      table.string('url');
      table.json('specialities');
      table.json('tags');
    }),
    knex.schema.createTable('FoodCoOp', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
      table.string('structure');
      table.float('cost');
      table.string('size');
    }),
    knex.schema.createTable('Grocery', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
    }),
    knex.schema.createTable('FarmStand', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
    }),
    knex.schema.createTable('FarmerMarket', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('place_id')
        .unsigned()
        .notNullable();
      table.foreign('place_id').references('Place.id');
      table.string('market_type');
      table.string('structure');
    }),
    knex.schema.createTable('FarmAssociates', table => {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .integer('farm_id')
        .unsigned()
        .notNullable();
      table.foreign('farm_id').references('Farm.id');
      table.integer('farmshare_id').unsigned();
      table.foreign('farmshare_id').references('FarmShare.id');
      table.integer('foodcoop_id').unsigned();
      table.foreign('foodcoop_id').references('FoodCoOp.id');
      table.integer('grocery_id').unsigned();
      table.foreign('grocery_id').references('Grocery.id');
      table.integer('farmstand_id').unsigned();
      table.foreign('farmstand_id').references('FarmStand.id');
      table.integer('farmermarket_id').unsigned();
      table.foreign('farmermarket_id').references('FarmerMarket.id');
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('FarmAssociates'),
    knex.schema.dropTableIfExists('FarmerMarket'),
    knex.schema.dropTableIfExists('FarmStand'),
    knex.schema.dropTableIfExists('Grocery'),
    knex.schema.dropTableIfExists('FoodCoOp'),
    knex.schema.dropTableIfExists('Farm'),
    knex.schema.dropTableIfExists('FarmShare'),
    knex.schema.dropTableIfExists('Place'),
  ]);
};
