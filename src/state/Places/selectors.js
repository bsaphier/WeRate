import { createSelector } from 'reselect';
import { FILTER_ALPH_ASCENDING, FILTER_ALPH_DESCENDING, FILTER_RATING_ASCENDING, FILTER_RATING_DESCENDING, FILTER_PLACES_BY_TAGS, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_REVIEW_COUNT } from '../App/types';



const getFilter = state => state.root.placeFilter;
const getReviews = state => state.reviews.byId;
const getPlaces = state => state.places.byId;


function reverseArray(arr) {
  return [...arr].reverse(); // Array.prototype.reverse mutates the original array. This function doesn't
}

function getReviewAvg(reviewIdsOfPlace, reviewsById) {
  if (reviewIdsOfPlace.length) {
    return reviewIdsOfPlace.map(id => reviewsById[id].rating).reduce((a, b) => (a + b)) / reviewIdsOfPlace.length;
  }
  return 0;
}

function sortPlaceNames(filteredIds, placesById) {
  return filteredIds.sort((a, b) => {
    const nameA = placesById[a].name.toUpperCase();
    const nameB = placesById[b].name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function sortReviewAvgs(filteredIds, reviewsById, placesById) {
  return filteredIds.sort((a, b) => {
    const reviewAvgA = getReviewAvg(placesById[a].reviewIds, reviewsById);
    const reviewAvgB = getReviewAvg(placesById[b].reviewIds, reviewsById);
    if (reviewAvgA < reviewAvgB) return -1;
    if (reviewAvgA > reviewAvgB) return 1;
    return 0;
  });
}

function visibilityFilter(filter, placesById) {
  const placeIds = Object.keys(placesById);
  switch (filter.visibility) {
    case FILTER_PLACES_SHOW_ALL:
      return placeIds;
    case FILTER_PLACES_BY_TAGS:
      return placeIds.filter(placeId =>
        filter.filterItems.some(tag => tag.placeIds && tag.placeIds.includes(placeId))
      );
    case FILTER_PLACES_BY_REVIEW_COUNT:
      return placeIds.sort((a, b) => {
        const reviewCountA = a.reviewIds.length;
        const reviewCountB = b.reviewIds.length;
        if (reviewCountA < reviewCountB) return -1;
        if (reviewCountA > reviewCountB) return 1;
        return 0;
      });
    default:
      return [];
  }
}

function orderPlaceIds(order, placesById, reviewsById, filteredPlaceIds) {
  switch (order) {
    case FILTER_ALPH_ASCENDING:
      return sortPlaceNames(filteredPlaceIds, placesById);
    case FILTER_ALPH_DESCENDING:
      return reverseArray(sortPlaceNames(filteredPlaceIds, placesById));
    case FILTER_RATING_ASCENDING:
      return sortReviewAvgs(filteredPlaceIds, reviewsById, placesById);
    case FILTER_RATING_DESCENDING:
      return reverseArray(sortReviewAvgs(filteredPlaceIds, reviewsById, placesById));
    default:
      break;
  }
}


export const getFilteredPlaces = createSelector(
  [ getFilter, getReviews, getPlaces ],
  (filter, reviewsById, placesById) => {
    const filteredPlaceIds = visibilityFilter(filter, placesById);
    return orderPlaceIds(filter.order, placesById, reviewsById, filteredPlaceIds);
  }
);


export const getReviewAvgs = createSelector(
  [ getReviews ],
  (reviewsById) => {
    const reviewAvgsByPlaceId = {};
    const reviewRatingsByPlaceId = {};
    // TODO: is this algo too slow?
    Object.keys(reviewsById).forEach(reviewId => {
      const { placeId, rating } = reviewsById[reviewId];
      if (reviewRatingsByPlaceId[placeId]) {
        reviewRatingsByPlaceId[placeId].push(rating);
      } else {
        reviewRatingsByPlaceId[placeId] = [ rating ];
      }
    });
    Object.keys(reviewRatingsByPlaceId).forEach(placeId => {
      const allRatingsForPlace = reviewRatingsByPlaceId[placeId];
      if (allRatingsForPlace.length) {
        reviewAvgsByPlaceId[placeId] = allRatingsForPlace.reduce((a, b) => a + b) / allRatingsForPlace.length;
      }
    });
    return reviewAvgsByPlaceId;
  }
);


export default { getReviewAvgs, getFilteredPlaces };
