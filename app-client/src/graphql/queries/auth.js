import { gql } from '@apollo/client';

// eslint-disable-next-line
export const GET_ME_INFO_QUERY = gql`
  query getMeInfo {
    meInfo {
      id
      email
      first_name
      last_name
      places {
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
  }
`;
