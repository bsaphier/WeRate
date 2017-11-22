// @flow
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './App';
import TagsReducer from './Tags';
import UserReducer from './User';
import AuthReducer from './Auth';
import FetchReducer from './Loader';
import PlacesReducer from './Places';
import ReviewsReducer from './Reviews';


const middleware = applyMiddleware(thunk, logger);


const rootReducer = combineReducers({
  root: RootReducer,
  tags: TagsReducer,
  user: UserReducer,
  auth: AuthReducer,
  fetch: FetchReducer,
  places: PlacesReducer,
  reviews: ReviewsReducer
});

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
