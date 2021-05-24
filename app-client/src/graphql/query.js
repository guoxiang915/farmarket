import { gql } from '@apollo/client';

export const GET_ME_INFO_QUERY = gql`
  query getMeInfo {
    meInfo {
      id
      email
      places {
        id
        name
        bio
        category
        location {
          latitude
          longitude
        }
        hours {
          start
          end
          weekday
        }
      }
    }
  }
`;

export const SEARCH_PLACES_QUERY = gql`
  query searchPlacesQuery(
    $q: String
    $cat: String
    $location: PlaceLocationInput
  ) {
    searchPlaces(q: $q, cat: $cat, location: $location) {
      id
      name
      bio
      category
      location {
        latitude
        longitude
      }
      hours {
        start
        end
        weekday
      }
    }
  }
`;

export const PLACE_DETAIL_QUERY = gql`
  query placeDetailQuery($id: ID!) {
    placeDetail(id: $id) {
      id
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
        start
        end
        weekday
      }
      facebook_url
      order_url
      ownership
      farmShares {
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
      farm {
        id
        location {
          latitude
          longitude
        }
        hours {
          start
          end
          weekday
        }
        url
        specialities
        tags
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
