// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import { ADD_PLACE, REMOVE_PLACE } from '../Places/types';
import { ADD_CATEGORY, REMOVE_CATEGORY } from './types';
import type { AddPlaceAction, RemovePlaceAction } from '../Places/types';
import type { AllIds, Action, Category, CategoriesById, AddCategoryAction, RemoveCategoryAction } from './types';


function addPlace(state: CategoriesById, action: AddPlaceAction): CategoriesById {
  const { id, categoryIds } = action.payload;
  
  if (categoryIds) {
    const nextState: CategoriesById = { ...state };

    categoryIds.forEach(categoryId => {
      const category: Category = state[categoryId];
      nextState[categoryId] = {
        ...category,
        placeIds: category.placeIds.concat(id)
      };
    });

    return nextState;
  }
  else return state;
}


function removePlace(state: CategoriesById, action: RemovePlaceAction): CategoriesById {
  const { id, categoryIds } = action.payload;
  
  if (categoryIds) {
    const nextState: CategoriesById = { ...state };

    categoryIds.forEach(categoryId => {
      const category: Category = state[categoryId];
      nextState[categoryId] = {
        ...category,
        placeIds: category.placeIds.filter(placeId => (placeId !== id))
      }
    });

    return nextState;
  }
  else return state;
}


function addCategory(state: CategoriesById, action: AddCategoryAction): CategoriesById {
  const { id } = action.payload;
  return {
    ...state,
    [id]: action.payload
  };
}


function removeCategory(state: CategoriesById, action: RemoveCategoryAction): CategoriesById {
  const nextState: CategoriesById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}


function categoriesById(state: CategoriesById = {}, action: Action | AddPlaceAction | RemovePlaceAction): CategoriesById {
  switch (action.type) {
    case ADD_PLACE:
      return addPlace(state, action);
    case REMOVE_PLACE:
      return removePlace(state, action);
    case ADD_CATEGORY:
      return addCategory(state, action);
    case REMOVE_CATEGORY:
      return removeCategory(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allCategories(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_CATEGORY:
      return state.concat(action.payload.id);
    case REMOVE_CATEGORY:
      return state.filter(categoryId => (categoryId !== action.payload.id));
    default:
      (action: empty);
      return state;
  }
}


const categoriesReducer: Reducer = combineReducers({
  byId: categoriesById,
  allIds: allCategories
});

export default categoriesReducer;