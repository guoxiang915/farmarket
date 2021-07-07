const udata = require('./Users.json');
const connection = require('../knexfile');

const knex = require('knex')(connection.production);

const chunkSize = 5000;
const users = udata.map(a => {
  return a;
});

const insertData = function() {
  return knex('Users')
    .del()
    .then(() =>
      knex
        .batchInsert('Users', users, chunkSize)
        .returning('id')
        .catch(error => {
          console.log(error);
        })
    );
};

insertData()
  .then(() => {
    console.log('Data Insertion Complete');
  })
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
  });
