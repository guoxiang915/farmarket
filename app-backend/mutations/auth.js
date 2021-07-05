import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import knex from '../knex';

export const registerUser = async (
  parent,
  {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    google_id: googleId,
    token_id: tokenId,
    facebook_id: facebookId,
  }
) => {
  let user = await knex('Users')
    .where('email', email)
    .first();
  if (user) {
    return new Error('User already exist');
  }

  if (password) {
    user = await knex('Users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: createHash('md5')
        .update(password)
        .digest('base64'),
    });
  } else if (googleId) {
    user = await knex('Users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      google_id: googleId,
      token_id: tokenId,
    });
  } else if (facebookId) {
    user = await knex('Users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      facebook_id: facebookId,
    });
  } else {
    return new Error("User credential doesn't exist");
  }

  return {
    email,
    token: jwt.sign({ email }, process.env.JWT_SECRET, {
      algorithm: 'HS512',
    }),
  };
};

export const login = async (
  parent,
  { email, password, google_id: googleId, facebook_id: facebookId }
) => {
  const user = await knex('Users')
    .where('email', email)
    .first();
  if (!user) {
    return new Error('User does not exist');
  }

  if (password) {
    if (
      createHash('md5')
        .update(password)
        .digest('base64') !== user.password
    ) {
      return new Error("Password doesn't match");
    }
  } else if (googleId) {
    if (googleId !== user.google_id) {
      return new Error("Google ID doesn't match");
    }
  } else if (facebookId) {
    if (facebookId !== user.facebook_id) {
      return new Error("Facebook ID doesn't match");
    }
  } else {
    return new Error("User credential doesn't exist");
  }

  return jwt.sign({ email }, process.env.JWT_SECRET, {
    algorithm: 'HS512',
  });
};
