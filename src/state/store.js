// @flow
import { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './App';
import TagsReducer from './Tags';
import AuthReducer from './Auth';
import UsersReducer from './Users';
import FetchReducer from './Loader';
import FilterReducer from './Filter';
import PlacesReducer from './Places';
import ReviewsReducer from './Reviews';


const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));
const composeEnhancers = composeWithDevTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678
});

const rootReducer = combineReducers({
  form: formReducer,
  root: AppReducer,
  tags: TagsReducer,
  auth: AuthReducer,
  users: UsersReducer,
  fetch: FetchReducer,
  filter: FilterReducer,
  places: PlacesReducer,
  reviews: ReviewsReducer,
});

const Store = createStore(
  rootReducer,
  composeEnhancers(middleware)
);

export default Store;
