// @flow
import { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import UserReducer from './User';
import PlacesReducer from './Places';
import ReviewsReducer from './Reviews';
import CategoriesReducer from './Categories';


const rootReducer = combineReducers({
  user: UserReducer,
  places: PlacesReducer,
  reviews: ReviewsReducer,
  categories: CategoriesReducer
});

const middleware = applyMiddleware(thunk, logger);

const Store = createStore(
  rootReducer,
  compose(
    middleware,
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  )
);

export default Store;
