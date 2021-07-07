import { isOpenFull, isOpenNow } from '../utils/functions';
import knex from '../utils/knex';

export const searchPlaces = async (parent, args) => {
  const { q, cat, rating, hour } = args;
  let places = knex('Place');
  if (q) {
    places = places.where(function() {
      this.where('name', 'like', `%${q}%`).orWhere('bio', 'like', `%${q}%`);
    });
  }
  if (cat) {
    places = places.where('category', cat);
  }
  if (rating) {
    places = places
      .where('rating', '>=', Number(rating))
      .where('rating', '<', Number(rating));
  }
  return places.then(result =>
    result
      .map(place => {
        if (typeof place.location === 'string') {
          place.location = JSON.parse(place.location);
        }
        if (place.hours && typeof place.hours === 'string') {
          place.hours = JSON.parse(place.hours);
        }
        return place;
      })
      .filter(place => {
        if (hour === 'now') {
          return isOpenNow(place.hours) || isOpenFull(place.hours);
        } else if (hour === 'full') {
          return isOpenFull(place.hours);
        }
        return !!place;
      })
  );
};

export const placeDetail = async (parent, args) => {
  const place = await knex('Place')
    .where('place_id', args.id)
    .then(places => {
      const user = places[0];
      if (!user) {
        throw new Error('Place not found');
      }
      return user;
    });

  let detailTable = '';
  switch (place.category) {
    case 'farm':
      detailTable = 'Farm';
      break;
    case 'foodCoOp':
      detailTable = 'FoodCoOp';
      break;
    case 'groceries':
      detailTable = 'Grocery';
      break;
    case 'farmStand':
      detailTable = 'FarmStand';
      break;
    case 'farmerMarket':
      detailTable = 'FarmerMarket';
      break;
    default:
      break;
  }
  if (!detailTable) {
    throw new Error('Category not found');
  }

  place[place.category] = await knex(detailTable)
    .where('place_id', args.id)
    .then(data => {
      if (!data || !data[0]) {
        throw new Error('Detail Information not found');
      }
      return data[0];
    });

  if (typeof place.location === 'string') {
    place.location = JSON.parse(place.location);
  }
  if (place.hours && typeof place.hours === 'string') {
    place.hours = JSON.parse(place.hours);
  }
  if (place.other_location && typeof place.other_location === 'string') {
    place.other_location = JSON.parse(place.other_location);
  }
  if (place.photos && typeof place.photos === 'string') {
    place.photos = JSON.parse(place.photos);
  }

  if (place.farm && place.farm.farm_share) {
    if (typeof place.farm.farm_share === 'string') {
      place.farm.farm_share = JSON.parse(place.farm.farm_share);
    }
    place.farm.farmShare = await knex('FarmShare').whereIn(
      'id',
      place.farm.farm_share
    );

    place.farm.farmShare.forEach(item => {
      if (item && item.contents && typeof item.contents === 'string') {
        item.contents = JSON.parse(item.contents);
      }
    });
  }
  if (
    place.farm &&
    place.farm.pickup_location &&
    typeof place.farm.pickup_location === 'string'
  ) {
    place.farm.pickup_location = JSON.parse(place.farm.pickup_location);
  }
  if (
    place.farm &&
    place.farm.volunteer_hours &&
    typeof place.farm.volunteer_hours === 'string'
  ) {
    place.farm.volunteer_hours = JSON.parse(place.farm.volunteer_hours);
  }
  if (
    place.farm &&
    place.farm.specialities &&
    typeof place.farm.specialities === 'string'
  ) {
    place.farm.specialities = JSON.parse(place.farm.specialities);
  }
  if (place.farm && place.farm.tags && typeof place.farm.tags === 'string') {
    place.farm.tags = JSON.parse(place.farm.tags);
  }

  console.log(place);

  return place;
};
