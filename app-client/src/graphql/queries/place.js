import { gql } from '@apollo/client';

export const SEARCH_PLACES_QUERY = gql`
  query searchPlacesQuery(
    $q: String
    $cat: String
    $rating: String
    $hour: String
    $location: PlaceLocationInput
  ) {
    searchPlaces(
      q: $q
      cat: $cat
      rating: $rating
      hour: $hour
      location: $location
    ) {
      place_id
      name
      bio
      category
      location {
        latitude
        longitude
      }
      hours {
        status
        hours {
          start
          end
          weekday
        }
      }
    }
  }
`;

export const PLACE_DETAIL_QUERY = gql`
  query placeDetailQuery($id: ID!) {
    placeDetail(id: $id) {
      place_id
      name
      bio
      category
      location {
        latitude
        longitude
      }
      containing
      other_location {
        latitude
        longitude
      }
      hours {
        status
        hours {
          start
          end
          weekday
        }
      }
      facebook_url
      order_url
      creator_id
      owner_id
      photos
      farm {
        id
        location {
          latitude
          longitude
        }
        hours {
          status
          hours {
            start
            end
            weekday
          }
        }
        url
        specialities
        tags
        farmShare {
          id
          type
          contents {
            item
            start
            end
          }
          pay_period
          payment
          pay_method
        }
      }
      foodCoOp {
        id
        structure
        farm
        cost
        size
      }
      groceries {
        id
        farm
      }
      farmStand {
        id
        farm
      }
      farmerMarket {
        id
        market_type
        farm
        structure
      }
    }
  }
`;
