import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, FlatList } from 'react-native';
import { resetPlaceFilter, orderPlacesByNameAsc, orderPlacesByNameDes, orderPlacesByReviewAvgAsc, orderPlacesByReviewAvgDsc } from '../state/Filter/action-creators';
import { FILTER_ALPH_ASCENDING, FILTER_ALPH_DESCENDING, FILTER_RATING_ASCENDING, FILTER_RATING_DESCENDING } from '../state/Filter/types';
import { getReviewAvgs, getFilteredPlaces } from '../state/Filter/selectors';
import { logout } from '../state/App/action-creators';
import { PlaceCard } from './components';



class PlacesTab extends Component {
  
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
        case 'tab.place.event.new':
          this.showNewPlaceForm();
          break;
        case 'global.event.logout':
          this.props.logout();
          break;
        default:
          break;
      }
    }
  }

  showSearchDrawer = () => {
    this.props.navigator.showModal({
      screen: 'werate.modal.search',
      title: 'Search'
    });
  }

  showNewPlaceForm = () => {
    this.props.navigator.showModal({
      screen: 'werate.modal.place',
      title: 'New Place Modal',
      passProps: { edit: false }
    });
  }

  showPlaceDetail = (placeId) => {
    const { allPlaces, navigator } = this.props;
    const selectedPlace = allPlaces[placeId];
    navigator.push({
      screen: 'werate.screen.place',
      title: selectedPlace.name,
      passProps: { place: selectedPlace },
      animated: true
    });
  }

  renderPlaceCard = ({ item: { placeId } }) => {
    const place = this.props.allPlaces[placeId];
    const { tagIds, createdBy } = place;
    const tags = tagIds.length ? tagIds.map(tagId => this.props.tagsById[tagId]) : [];
    return this.props.loaded && (
      <PlaceCard
          icon={'ios-images-outline'}
          tags={tags}
          place={place}
          reviewAvg={this.props.reviewAvgsByPlaceId[placeId]}
          createdBy={this.props.usersById[createdBy]}
          onSelect={() => this.showPlaceDetail(placeId)}
      />
    );
  }

  render() {
    const { loggedIn, filterBy, placesById, onResetPlaceFilter, orderPlacesByNameAsc, orderPlacesByNameDes, orderPlacesByReviewAvgAsc, orderPlacesByReviewAvgDsc } = this.props;
    const filterAlphAsc = filterBy === FILTER_ALPH_ASCENDING;
    const filterAlphDes = filterBy === FILTER_ALPH_DESCENDING;
    const filterRtngAsc = filterBy === FILTER_RATING_ASCENDING;
    const filterRtngDes = filterBy === FILTER_RATING_DESCENDING;
    return loggedIn && (
      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <Button title="show all" onPress={onResetPlaceFilter} />
          <Button title={`abc ${filterAlphAsc ? '>' : '<'}`} onPress={filterAlphDes ? orderPlacesByNameAsc : orderPlacesByNameDes} />
          <Button title={`avg. ${filterRtngAsc ? '>' : '<'}`} onPress={filterRtngDes ? orderPlacesByReviewAvgAsc : orderPlacesByReviewAvgDsc} />
          <Button title="search" onPress={this.showSearchDrawer} />
        </View>
        <FlatList
            data={placesById.map(placeId => ({ key: placeId, placeId }))}
            renderItem={this.renderPlaceCard}
        />
      </View>
    );
  }
}


const mapState = (state) => ({
  loggedIn: state.auth.isLoggedIn,
  loaded: state.fetch.initialStateLoaded,
  tagsById: state.tags.byId,
  usersById: state.users.byId,
  allPlaces: state.places.byId,
  filterBy: state.filter.order,
  placesById: getFilteredPlaces(state),
  reviewAvgsByPlaceId: getReviewAvgs(state)
});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  onResetPlaceFilter: () => dispatch(resetPlaceFilter()),
  orderPlacesByNameAsc: () => dispatch(orderPlacesByNameAsc()),
  orderPlacesByNameDes: () => dispatch(orderPlacesByNameDes()),
  orderPlacesByReviewAvgAsc: () => dispatch(orderPlacesByReviewAvgAsc()),
  orderPlacesByReviewAvgDsc: () => dispatch(orderPlacesByReviewAvgDsc())
});


export default connect(mapState, mapDispatch)(PlacesTab);
