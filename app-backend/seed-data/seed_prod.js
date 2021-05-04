const udata = require('./Users.json');
const connection = require('../knexfile');

const knex = require('knex')(connection.production);

const users = udata.map(a => {
  return a;
});

const insertData = function() {
  return knex('Users')
    .del()
    .then(() => knex('Users').insert(users));
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
