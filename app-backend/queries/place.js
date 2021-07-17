import categoryTables from '../utils/db/mapTable';
import { isOpenFull, isOpenNow } from '../utils/functions';
import knex from '../utils/knex';
import { parsePlaceData } from '../utils/mergePlace';

const getPlaceDetailData = async id => {
  const place = await knex('Place')
    .where('place_id', id)
    .then(places => {
      const user = places[0];
      if (!user) {
        throw new Error('Place not found');
      }
      return user;
    });

  // Get place info based on category
  const { detailTable } =
    categoryTables.find(item => item.category === place.category) || {};
  if (!detailTable) {
    throw new Error('Category not found');
  }

  place[place.category] = await knex(detailTable)
    .where('place_id', id)
    .then(data => {
      if (!data || !data[0]) {
        throw new Error('Detail Information not found');
      }
      return data[0];
    });

  // Convert some details for place
  parsePlaceData(place);

  return place;
};

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
  const place = await getPlaceDetailData(args.id);

  // Get place info based on category
  const { associateId: idName } =
    categoryTables.find(item => item.category === place.category) || {};

  // Get associated place information
  if (idName) {
    const populate = [];
    const associates = await knex('FarmAssociates').where(idName, args.id);

    if (associates && associates.length) {
      // eslint-disable-next-line
      for (const item of associates) {
        // eslint-disable-next-line
        for (const assInfo of categoryTables) {
          const { associateId } = assInfo;
          if (associateId !== idName && !!item[associateId]) {
            const assData = await getPlaceDetailData(item[associateId]);
            populate.push(assData);
          }
        }
      }
    }

    place.associates = JSON.stringify(populate);
  }

  return place;
};
