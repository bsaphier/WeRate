// @flow
import { ADD_CATEGORY, REMOVE_CATEGORY } from './types';
import type { Category, AddCategoryAction, RemoveCategoryAction } from './types';
import type { ActionCreator } from 'redux';


export const addCategory: ActionCreator = (category: Category): AddCategoryAction => ({
  type: ADD_CATEGORY,
  payload: category
});


export const removeCategory: ActionCreator = (category: Category): RemoveCategoryAction => ({
  type: REMOVE_CATEGORY,
  payload: category
});


export default {
  addCategory,
  removeCategory
};
