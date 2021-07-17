import knex from './knex';

export const parseFarmData = async farm => {
  if (farm && farm.farm_share) {
    if (typeof farm.farm_share === 'string') {
      farm.farm_share = JSON.parse(farm.farm_share);
    }
    farm.farmShare = await knex('FarmShare').whereIn('id', farm.farm_share);

    farm.farmShare.forEach(item => {
      if (item && item.contents && typeof item.contents === 'string') {
        item.contents = JSON.parse(item.contents);
      }
    });
  }
  if (
    farm &&
    farm.pickup_location &&
    typeof farm.pickup_location === 'string'
  ) {
    farm.pickup_location = JSON.parse(farm.pickup_location);
  }
  if (
    farm &&
    farm.volunteer_hours &&
    typeof farm.volunteer_hours === 'string'
  ) {
    farm.volunteer_hours = JSON.parse(farm.volunteer_hours);
  }
  if (farm && farm.specialities && typeof farm.specialities === 'string') {
    farm.specialities = JSON.parse(farm.specialities);
  }
  if (farm && farm.tags && typeof farm.tags === 'string') {
    farm.tags = JSON.parse(farm.tags);
  }

  return farm;
};

export const parsePlaceData = async place => {
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

  if (place.category === 'farm' && place.farm) {
    parseFarmData(place.farm);
  }

  return place;
};
