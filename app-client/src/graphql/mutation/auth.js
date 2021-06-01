import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGIN_BY_GOOGLE_MUTATION = gql`
  mutation loginByGoogleMutation(
    $email: String!
    $google_id: String!
    $token_id: String!
  ) {
    login(
      email: $email
      password: ""
      google_id: $google_id
      token_id: $token_id
    )
  }
`;

export const LOGIN_BY_FACEBOOK_MUTATION = gql`
  mutation loginByFacebookMutation($email: String!, $facebook_id: String!) {
    login(
      email: $email
      password: ""
      google_id: ""
      token_id: ""
      facebook_id: $facebook_id
    )
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
      token
    }
  }
`;

export const REGISTER_BY_GOOGLE_MUTATION = gql`
  mutation registerByGoogleMutation(
    $email: String!
    $google_id: String!
    $token_id: String!
    $first_name: String
    $last_name: String
  ) {
    registerUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: ""
      google_id: $google_id
      token_id: $token_id
    ) {
      email
      token
    }
  }
`;

export const REGISTER_BY_FACEBOOK_MUTATION = gql`
  mutation registerByFacebookMutation(
    $email: String!
    $facebook_id: String!
    $first_name: String
    $last_name: String
  ) {
    registerUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: ""
      google_id: ""
      token_id: ""
      facebook_id: $facebook_id
    ) {
      email
      token
    }
  }
`;
