import knex from '../utils/knex';

// eslint-disable-next-line
export const meInfo = async (parent, args, context) => {
  const users = await knex('Users').where(
    'email',
    (context.user && context.user.email) || ''
  );

  if (!users || !users.length) {
    throw new Error('User not found');
  }

  const user = users[0];
  if (!user.id) {
    throw new Error('Invalid user data');
  }

  const places = await knex('Place').where(function() {
    this.where('creator_id', user.id).orWhere('owner_id', user.id);
  });
  places.map(place => {
    if (typeof place.location === 'string') {
      place.location = JSON.parse(place.location);
    }
    if (place.hours && typeof place.hours === 'string') {
      place.hours = JSON.parse(place.hours);
    }
    return place;
  });
  user.places = places;
  return user;
};
