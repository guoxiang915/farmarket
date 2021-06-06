import { gql } from '@apollo/client';

export const ADD_PLACE_MUTATION = gql`
  mutation addPlaceMutation($place: AddPlaceInput!) {
    addPlace(place: $place) {
      place_id
      name
    }
  }
`;

export const UPDATE_PLACE_MUTATION = gql`
  mutation updatePlaceMutation($place: AddPlaceInput!) {
    updatePlace(place: $place) {
      place_id
      name
    }
  }
`;
