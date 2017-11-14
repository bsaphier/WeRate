// @flow
export const ADD_CATEGORY: 'ADD_CATEGORY' = 'ADD_CATEGORY';
export const REMOVE_CATEGORY: 'REMOVE_CATEGORY' = 'REMOVE_CATEGORY';


export type Id = string;
export type AllIds = Array<Id>;


// A category is a tag for places.
// A category can have many places & a place can have many categories.
export type Category = {|
  +id: Id,
  title: string,
  placeIds: Array<string>
|};

export type Categories = Array<Category>;
export type CategoriesById = { [id: Id]: Category };

export type categoriesState = {|
  byId: CategoriesById,
  allIds: AllIds
|};


export type AddCategoryAction = {| +type: typeof ADD_CATEGORY, payload: Category |};
export type RemoveCategoryAction = {| +type: typeof REMOVE_CATEGORY, payload: Category |};

export type Action =
  | empty
  | AddCategoryAction
  | RemoveCategoryAction;
