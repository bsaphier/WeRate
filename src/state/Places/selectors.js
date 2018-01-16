import { createSelector } from 'reselect';
import { FILTER_ALPH_ASCENDING, FILTER_ALPH_DESCENDING, FILTER_RATING_ASCENDING, FILTER_RATING_DESCENDING, FILTER_PLACES_BY_TAGS, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_REVIEW_COUNT } from '../App/types';



const getVisibilityFilter = state => state.root.placeFilter.visibility;
const getFilterItems = state => state.root.placeFilter.filterItems;
const getFilterOrder = state => state.root.placeFilter.order;
const getReviews = state => state.reviews.byId;
const getPlaces = state => state.places.byId;

/** EXTRACT TO A UTILS FOLDER */

function sortPlaceNames(placesById) {
  return placesById.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function sortPlaceReviewAvgs(placesById, reviewsById) {
  return placesById.sort((a, b) => {
    const reviewAvgA = getReviewAvg(a.reviewIds, reviewsById);
    const reviewAvgB = getReviewAvg(b.reviewIds, reviewsById);
    if (reviewAvgA < reviewAvgB) return -1;
    if (reviewAvgA > reviewAvgB) return 1;
    return 0;
  });
}

function getReviewAvg(reviewIdsOfPlace, reviewsById) {
  return reviewIdsOfPlace.reduce((a, b) => reviewsById[a].rating + reviewsById[b].rating) / reviewIdsOfPlace.length;
}

function reverseArray(arr) {
  return [...arr].reverse();
}

/** */


export const getFilteredPlaces = createSelector(
  [ getVisibilityFilter, getFilterItems, getPlaces ],
  (visibilityFilter, tags, placesById) => {
    const placeIds = Object.keys(placesById);
    switch (visibilityFilter) {
      case FILTER_PLACES_SHOW_ALL:
        return placeIds;
      case FILTER_PLACES_BY_TAGS:
        return placeIds.filter(placeId =>
          tags.some(tag => tag.placeIds && tag.placeIds.includes(placeId))
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
        break;
    }
  }
);

export const getOrderedPlaces = createSelector(
  [ getFilterOrder, getPlaces, getReviews ],
  (orderBy, placesById, reviewsById) => {
    switch (orderBy) {
      case FILTER_ALPH_ASCENDING:
        return sortPlaceNames(placesById);
      case FILTER_ALPH_DESCENDING:
        return reverseArray(sortPlaceNames(placesById));
      case FILTER_RATING_ASCENDING:
        return sortPlaceReviewAvgs(placesById, reviewsById);
      case FILTER_RATING_DESCENDING:
        return reverseArray(sortPlaceReviewAvgs(placesById, reviewsById));
      default:
        break;
    }
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


export default { getReviewAvgs, getOrderedPlaces, getFilteredPlaces };
