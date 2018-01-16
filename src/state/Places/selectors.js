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
