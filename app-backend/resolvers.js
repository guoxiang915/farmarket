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
      meInfo: async (parent, args, context) => {
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

        const places = await knex('Place').where('user_id', user.id);
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
      },
      searchFarms: (parent, args, context) => {
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
      searchPlaces: async (parent, args) => {
        const { q, cat } = args;
        let places = knex('Place');
        if (q) {
          places = places
            .where('name', 'like', `%${q}%`)
            .orWhere('bio', 'like', `%${q}%`);
        }
        if (cat) {
          places = places.where('category', cat);
        }
        return places.then(result =>
          result.map(place => {
            if (typeof place.location === 'string') {
              place.location = JSON.parse(place.location);
            }
            if (place.hours && typeof place.hours === 'string') {
              place.hours = JSON.parse(place.hours);
            }
            return place;
          })
        );
      },
      placeDetail: async (parent, args) => {
        const place = await knex('Place')
          .where('id', args.id)
          .then(places => {
            const user = places[0];
            if (!user) {
              throw new Error('Place not found');
            }
            return user;
          });

        let detailTable = '';
        switch (place.category) {
          case 'farmShares':
            detailTable = 'FarmShare';
            break;
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
              throw new Error('Farm Shares not found');
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
        if (place.farmShares && place.farmShares.contents && typeof place.farmShares.contents === 'string') {
          place.farmShares.contents = JSON.parse(place.farmShares.contents);
        }
        if (place.farm && place.farm.pickup_location && typeof place.farm.pickup_location === 'string') {
          place.farm.pickup_location = JSON.parse(place.farm.pickup_location);
        }
        if (place.farm && place.farm.volunteer_hours && typeof place.farm.volunteer_hours === 'string') {
          place.farm.volunteer_hours = JSON.parse(place.farm.volunteer_hours);
        }
        if (place.farm && place.farm.specialities && typeof place.farm.specialities === 'string') {
          place.farm.specialities = JSON.parse(place.farm.specialities);
        }
        if (place.farm && place.farm.tags && typeof place.farm.tags === 'string') {
          place.farm.tags = JSON.parse(place.farm.tags);
        }

        console.log(place);

        return place;
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

        return { email };
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
      addPlace: async (parent, { place }, context) => {
        const {
          overview,
          farmShares,
          farm,
          foodCoOp,
          groceries,
          farmStand,
          farmerMarket,
        } = place;
        const userData = await knex('Users')
          .where('email', (context.user && context.user.email) || '')
          .then(users => {
            const user = users[0];
            if (!user) {
              throw new Error('User not found');
            }
            return user;
          });

        if (!overview.category) {
          return new Error(
            'Category should be one of farmShares, farm, foodCoOp, groceries, farmStand, farmerMarket'
          );
        }

        const placeData = await knex('Place')
          .insert({
            user_id: userData.id,
            name: overview.name,
            bio: overview.bio,
            category: overview.category,
            location: JSON.stringify(overview.location),
            containing: overview.containing,
            other_location: JSON.stringify(overview.otherLocation),
            hours: JSON.stringify(overview.hours),
            facebook_url: overview.facebookUrl,
            order_url: overview.orderUrl,
            ownership: overview.ownership,
          })
          .returning('id');
        const placeId = placeData[0];

        switch (overview.category) {
          case 'farmShares':
            if (farmShares.farmShare && farmShares.farmShare.length) {
              await knex('FarmShare').insert(
                farmShares.map(item => ({
                  place_id: placeId,
                  type: item.type,
                  contents: JSON.stringify(item.contents),
                  pay_period: item.payPeriod,
                  payment: item.payment,
                  pay_method: item.payMethod,
                }))
              );
            }
            break;
          case 'farm':
            await knex('Farm').insert({
              place_id: placeId,
              pickup_location: JSON.stringify(farm.location),
              volunteer_hours: JSON.stringify(farm.hours),
              url: farm.url,
              specialities: JSON.stringify(farm.specialities),
              tags: JSON.stringify(farm.tags),
            });
            break;
          case 'foodCoOp':
            {
              const foodCoOpData = await knex('FoodCoOp').insert({
                place_id: placeId,
                structure: foodCoOp.structure,
                cost: foodCoOp.cost,
                size: foodCoOp.size,
              }).returning('id');
              if (foodCoOp.farm && foodCoOp.farm.length) {
                await knex('FarmAssociates').insert(
                  foodCoOp.farm.map(item => ({
                    farm_id: item,
                    foodcoop_id: foodCoOpData[0],
                  }))
                );
              }
            }
            break;
          case 'groceries':
            {
              const groceryData = await knex('Grocery').insert({
                place_id: placeId,
              }).returning('id');
              if (groceries.farm && groceries.farm.length) {
                await knex('FarmAssociates').insert(
                  groceries.farm.map(item => ({
                    farm_id: item,
                    grocery_id: groceryData[0],
                  }))
                );
              }
            }
            break;
          case 'farmStand':
            {
              const farmStandData = await knex('FarmStand').insert({
                place_id: placeId,
              }).returning('id');
              if (farmStand.farm && farmStand.farm.length) {
                await knex('FarmAssociates').insert(
                  farmStand.farm.map(item => ({
                    farm_id: item,
                    farmstand_id: farmStandData[0],
                  }))
                );
              }
            }
            break;
          case 'farmerMarket':
            {
              const farmerMarketData = await knex('FarmerMarket').insert({
                place_id: placeId,
                market_type: farmerMarket.marketType,
                structure: farmerMarket.structure,
              }).returning('id');
              if (farmerMarket.farm && farmerMarket.farm.length) {
                await knex('FarmAssociates').insert(
                  farmerMarket.farm.map(item => ({
                    farm_id: item,
                    farmermarket_id: farmerMarketData[0],
                  }))
                );
              }
            }
            break;
          default:
            return new Error(
              'Category should be one of farmShares, farm, foodCoOp, groceries, farmStand, farmerMarket'
            );
        }

        return {
          id: placeId,
          name: overview.name,
        };
      },
    },
  },
];
