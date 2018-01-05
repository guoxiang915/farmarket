import React, { Component } from 'react';
import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react/dist/Auth';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';

Amplify.configure({
  Auth: {
    region: 'xx-xxxx-x', // REQUIRED - Amazon Cognito Region
    userPoolId: 'xx-xxxx-x_xxxxxxxxx', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: 'xxxxx', //User Pool App Client ID
  },
});

const getCreds = async () => {
  return await Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: 'us-east-1',
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: getCreds(),
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Serverless GraphQL Apollo </h2>
        </div>
        <div className="App-User">
          <UserList />
        </div>
      </div>
    );
  }
}

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(WithProvider, { includeGreetings: true });
