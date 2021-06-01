import { gql } from '@apollo/client';

export const ADD_PLACE_MUTATION = gql`
  mutation addPlaceMutation($place: AddPlaceInput!) {
    addPlace(place: $place) {
      id
      name
    }
  }
`;

export const UPDATE_PLACE_MUTATION = gql`
  mutation updatePlaceMutation($place: AddPlaceInput!) {
    updatePlace(place: $place) {
      id
      name
    }
  }
`;
