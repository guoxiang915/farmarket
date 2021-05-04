const faker = require('faker');
const jsonfile = require('jsonfile');
const { createHash } = require('crypto');

const udata = [];

faker.seed(1000);

for (let i = 0; i < 10; i++) {
  const userInfo = {
    id: i,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: createHash('md5')
      .update('test')
      .digest('base64'),
  };

  udata.push(userInfo);
}

const ufile = 'Users.json';

jsonfile.writeFileSync(ufile, udata, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});
