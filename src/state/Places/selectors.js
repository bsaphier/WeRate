import { createSelector } from 'reselect';
import { FILTER_PLACES_BY_TAGS, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_REVIEW_COUNT } from '../App/types';



const getVisibilityFilter = state => state.root.placeFilter.visibility;
const getFilterItems = state => state.root.placeFilter.filterItems;
const getReviews = state => state.reviews.byId;
const getPlaces = state => state.places.byId;


export const getFilteredPlaces = createSelector(
  [ getVisibilityFilter, getFilterItems, getPlaces ],
  (visibilityFilter, tags, places) => {
    const placeIds = Object.keys(places);
    switch (visibilityFilter) {
      
      case FILTER_PLACES_SHOW_ALL:
        return placeIds;
      
      case FILTER_PLACES_BY_TAGS:
        return placeIds.filter(placeId =>
          tags.some(tag => tag.placeIds && tag.placeIds.includes(placeId))
        );
      
      case FILTER_PLACES_BY_REVIEW_COUNT:
        // TODO
        return placeIds;
    
      default:
        break;
    }
  }
);


export const getReviewAvgs = createSelector(
  [ getReviews ],
  (reviewsById) => {
    const reviewAvgByPlaceId = {};
    const reviewRatingsByPlaceId = {};
    // TODO: is this algo too slow?
    Object.keys(reviewsById).forEach(reviewId => {
      const review = reviewsById[reviewId];
      if (reviewRatingsByPlaceId[review.placeId]) {
        reviewRatingsByPlaceId[review.placeId].push(review.rating);
      } else {
        reviewRatingsByPlaceId[review.placeId] = [review.rating];
      }
    });
    Object.keys(reviewRatingsByPlaceId).forEach(placeId => {
      if (reviewRatingsByPlaceId[placeId].length) {
        reviewAvgByPlaceId[placeId] = reviewRatingsByPlaceId[placeId].reduce((a, b) => a + b) / reviewRatingsByPlaceId[placeId].length;
      }
    });
    return reviewAvgByPlaceId;
  }
);


export default { getReviewAvgs, getFilteredPlaces };
