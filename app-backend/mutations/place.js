import { v4 as uuid } from 'uuid';
import knex from '../utils/knex';

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
      photos: overview.photos ? JSON.stringify(overview.photos) : null,
      services: JSON.stringify(
        Object.fromEntries(
          (overview.services || []).map(service => [service, true])
        )
      ),
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
          farm_share: JSON.stringify(farmShare),
        });
      }
      break;
    case 'foodCoOp':
      await knex('FoodCoOp')
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
            foodcoop_id: placeId,
          }))
        );
      }
      break;
    case 'groceries':
      await knex('Grocery')
        .insert({
          place_id: placeId,
        })
        .returning('id');
      if (groceries.farm && groceries.farm.length) {
        await knex('FarmAssociates').insert(
          groceries.farm.map(item => ({
            farm_id: item,
            grocery_id: placeId,
          }))
        );
      }
      break;
    case 'farmStand':
      await knex('FarmStand')
        .insert({
          place_id: placeId,
        })
        .returning('id');
      if (farmStand.farm && farmStand.farm.length) {
        await knex('FarmAssociates').insert(
          farmStand.farm.map(item => ({
            farm_id: item,
            farmstand_id: placeId,
          }))
        );
      }
      break;
    case 'farmerMarket':
      await knex('FarmerMarket')
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
            farmermarket_id: placeId,
          }))
        );
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

export const updatePlace = async (parent, { place }, context) => {
  const {
    place_id: placeId,
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

  await knex('Place')
    .where({ place_id: placeId })
    .update({
      name: overview.name,
      bio: overview.bio,
      containing: overview.containing,
      other_location: JSON.stringify(overview.otherLocation),
      hours: JSON.stringify(overview.hours),
      facebook_url: overview.facebookUrl,
      order_url: overview.orderUrl,
      owner_id: overview.ownership ? userData.id : null,
      photos: overview.photos ? JSON.stringify(overview.photos) : null,
      services: JSON.stringify(
        Object.fromEntries(
          (overview.services || []).map(service => [service, true])
        )
      ),
    });

  switch (overview.category) {
    case 'farm':
      {
        const farmShare = [];
        // if (farm.farmShare && farm.farmShare.length) {
        //   farmShare = await knex('FarmShare').insert(
        //     farm.farmShare.map(item => ({
        //       place_id: placeId,
        //       type: item.type,
        //       contents: JSON.stringify(item.contents),
        //       pay_period: item.payPeriod,
        //       payment: item.payment,
        //       pay_method: item.payMethod,
        //     }))
        //   );
        // }
        const farmData = farm.id;
        await knex('Farm')
          .where({ id: farmData })
          .update({
            pickup_location: JSON.stringify(farm.location),
            volunteer_hours: JSON.stringify(farm.hours),
            url: farm.url,
            specialities: JSON.stringify(farm.specialities),
            tags: JSON.stringify(farm.tags),
            farm_share: JSON.stringify(farmShare),
          });
      }
      break;
    case 'foodCoOp':
      await knex('FoodCoOp')
        .where({ id: foodCoOp.id })
        .update({
          structure: foodCoOp.structure,
          cost: foodCoOp.cost,
          size: foodCoOp.size,
        });
      if (foodCoOp.farm && foodCoOp.farm.length) {
        const exists = (
          await knex('FarmAssociates').where({ foodcoop_id: placeId })
        ).map(item => item.farm_id);

        await knex('FarmAssociates').insert(
          foodCoOp.farm
            .filter(item => !exists.includes(item))
            .map(item => ({
              farm_id: item,
              foodcoop_id: placeId,
            }))
        );
      }
      break;
    case 'groceries':
      // await knex('Grocery')
      //   .where({ id: groceries.id })
      //   .update({});
      if (groceries.farm && groceries.farm.length) {
        const exists = (
          await knex('FarmAssociates').where({ grocery_id: placeId })
        ).map(item => item.farm_id);

        await knex('FarmAssociates').insert(
          groceries.farm
            .filter(item => !exists.includes(item))
            .map(item => ({
              farm_id: item,
              grocery_id: placeId,
            }))
        );
      }
      break;
    case 'farmStand':
      // await knex('FarmStand')
      //   .where({ id: farmStand.id })
      //   .update({});
      if (farmStand.farm && farmStand.farm.length) {
        const exists = (
          await knex('FarmAssociates').where({ farmstand_id: placeId })
        ).map(item => item.farm_id);

        await knex('FarmAssociates').insert(
          farmStand.farm
            .filter(item => !exists.includes(item))
            .map(item => ({
              farm_id: item,
              farmstand_id: placeId,
            }))
        );
      }
      break;
    case 'farmerMarket':
      await knex('FarmerMarket')
        .where({ id: farmerMarket.id })
        .update({
          market_type: farmerMarket.marketType,
          structure: farmerMarket.structure,
        });

      if (farmerMarket.farm && farmerMarket.farm.length) {
        const exists = (
          await knex('FarmAssociates').where({
            farmermarket_id: placeId,
          })
        ).map(item => item.farm_id);

        await knex('FarmAssociates').insert(
          farmerMarket.farm
            .filter(item => !exists.includes(item))
            .map(item => ({
              farm_id: item,
              farmermarket_id: placeId,
            }))
        );
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
