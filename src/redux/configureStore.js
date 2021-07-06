// imports from node_modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// imports from user created files
import { navbarReducer } from './navbarReducer';
import { inputReducer } from './inputReducer';
import { errorsReducer } from './errorsReducer';
import { listingsReducer } from './listingsReducer';
import { listingReducer } from './listingReducer';
import { alertReducer } from './alertReducer';
import { redirectReducer } from './redirectReducer';
import { userReducer } from './userReducer';

export const ConfigureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({
      navbar: navbarReducer,
      input: inputReducer,
      errors: errorsReducer,
      listings: listingsReducer,
      listing: listingReducer,
      alert: alertReducer,
      redirect: redirectReducer,
      user: userReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
}