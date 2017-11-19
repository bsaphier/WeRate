// @flow
import { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import UserReducer from './User';
import AuthReducer from './Auth';
import PlacesReducer from './Places';
import FetchReducer from './Loader';
import ReviewsReducer from './Reviews';
import TagsReducer from './Tags';


const rootReducer = combineReducers({
  tags: TagsReducer,
  user: UserReducer,
  auth: AuthReducer,
  fetch: FetchReducer,
  places: PlacesReducer,
  reviews: ReviewsReducer
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
