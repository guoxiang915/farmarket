import { createStore } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

const history = createBrowserHistory();

const configureStore = initialState => {
  const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState
  );
  if (module.hot) {
    // Enable Webpack hot module replacement from reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = connectRouter(history)(rootReducer); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

export default configureStore;
