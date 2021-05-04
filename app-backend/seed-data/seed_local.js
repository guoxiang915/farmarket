const udata = require('./Users.json');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../dev.db',
  },
});

const users = udata.map(a => {
  return a;
});

const insertData = function() {
  return knex('Users').insert(users);
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
