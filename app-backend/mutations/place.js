import { v4 as uuid } from 'uuid';
import knex from '../knex';

// eslint-disable-next-line
export const addPlace = async (parent, { place }, context) => {
  const {
    overview,
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
      'Category should be one of farm, foodCoOp, groceries, farmStand, farmerMarket'
    );
  }

  const placeId = uuid();
  await knex('Place')
    .insert({
      place_id: placeId,
      creator_id: userData.id,
      name: overview.name,
      bio: overview.bio,
      category: overview.category,
      location: JSON.stringify(overview.location),
      containing: overview.containing,
      other_location: JSON.stringify(overview.otherLocation),
      hours: JSON.stringify(overview.hours),
      facebook_url: overview.facebookUrl,
      order_url: overview.orderUrl,
      owner_id: overview.ownership ? userData.id : null,
    })
    .returning('place_id');

  switch (overview.category) {
    case 'farm':
      {
        let farmShare = [];
        if (farm.farmShare && farm.farmShare.length) {
          farmShare = await knex('FarmShare').insert(
            farm.farmShare.map(item => ({
              place_id: placeId,
              type: item.type,
              contents: JSON.stringify(item.contents),
              pay_period: item.payPeriod,
              payment: item.payment,
              pay_method: item.payMethod,
            }))
          );
        }
        await knex('Farm').insert({
          place_id: placeId,
          pickup_location: JSON.stringify(farm.location),
          volunteer_hours: JSON.stringify(farm.hours),
          url: farm.url,
          specialities: JSON.stringify(farm.specialities),
          tags: JSON.stringify(farm.tags),
          farmShare: JSON.stringify(farmShare),
        });
      }
      break;
    case 'foodCoOp':
      {
        const foodCoOpData = await knex('FoodCoOp')
          .insert({
            place_id: placeId,
            structure: foodCoOp.structure,
            cost: foodCoOp.cost,
            size: foodCoOp.size,
          })
          .returning('id');
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
        const groceryData = await knex('Grocery')
          .insert({
            place_id: placeId,
          })
          .returning('id');
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
        const farmStandData = await knex('FarmStand')
          .insert({
            place_id: placeId,
          })
          .returning('id');
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
        const farmerMarketData = await knex('FarmerMarket')
          .insert({
            place_id: placeId,
            market_type: farmerMarket.marketType,
            structure: farmerMarket.structure,
          })
          .returning('id');
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
        'Category should be one of farm, foodCoOp, groceries, farmStand, farmerMarket'
      );
  }

  return {
    place_id: placeId,
    name: overview.name,
  };
};
