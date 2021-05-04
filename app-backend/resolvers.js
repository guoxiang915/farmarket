import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';

const connection = require('./knexfile');

const knex = require('knex')(
  process.env.NODE_ENV === 'production'
    ? connection.production
    : connection.development
);

// eslint-disable-next-line import/prefer-default-export
export const resolvers = [
  {
    Query: {
      meInfo: (parent, args, context) => {
        console.log(context);
        return knex('Users')
          .where('email', (context.user && context.user.email) || '')
          .then(users => {
            const user = users[0];
            if (!user) {
              throw new Error('User not found');
            }
            return user;
          });
      },
    },
    Mutation: {
      registerUser: async (
        parent,
        { first_name: firstName, last_name: lastName, email, password }
      ) => {
        let user = await knex('Users')
          .where('email', email)
          .first();
        if (user) {
          return new Error('User already exist');
        }

        user = await knex('Users').insert({
          first_name: firstName,
          last_name: lastName,
          email,
          password: createHash('md5')
            .update(password)
            .digest('base64'),
        });

        return user;
      },
      login: async (parent, { email, password }) => {
        const user = await knex('Users')
          .where('email', email)
          .first();
        if (!user) {
          return new Error('User does not exist');
        }

        if (
          createHash('md5')
            .update(password)
            .digest('base64') !== user.password
        ) {
          return new Error("Password doesn't match");
        }

        return jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            algorithm: 'HS512',
          }
        );
      },
    },
  },
];
