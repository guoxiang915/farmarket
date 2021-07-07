import React from 'react';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
// import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import '@brainhubeu/react-carousel/lib/style.css';

import theme from './common/theme';
import configureStore from './store';

import Router from './Router';
import './App.css';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: token ? { ...headers, authorization: `Bearer ${token}` } : headers,
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

// const uploadLink = createUploadLink({
//   uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
//   header: {
//     'keep-alive': 'true',
//   },
// });

console.log(authLink);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const store = configureStore();

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
