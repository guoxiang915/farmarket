import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER_MUTATION = gql`
  mutation registerMutation(
    $first_name: String
    $last_name: String
    $email: String!
    $password: String!
  ) {
    registerUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
    ) {
      email
    }
  }
`;

export const ADD_PLACE_MUTATION = gql`
  mutation addPlaceMutation($place: AddPlaceInput!) {
    addPlace(place: $place) {
      id
      name
    }
  }
`;
