import React from 'react';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './common/theme';

import Router from './Router';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

/* fetch data from graphQL server and print on console */
// client.query({ query: gql`{ hello }` }).then(console.log);

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <div className="App-User">
          <Router />
        </div>
      </div>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
