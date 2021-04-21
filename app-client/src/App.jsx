import React from 'react';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import theme from './common/theme';
import configureStore from './store';

import Router from './Router';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

const store = configureStore();

/* fetch data from graphQL server and print on console */
// client.query({ query: gql`{ hello }` }).then(console.log);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="App-User">
            <Router />
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
