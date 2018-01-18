import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { resetPlaceFilter, orderPlacesByNameAsc, orderPlacesByNameDes, orderPlacesByReviewAvgAsc, orderPlacesByReviewAvgDsc } from '../state/App/action-creators';
import { getReviewAvgs, getFilteredPlaces } from '../state/Places/selectors';
import { logout } from '../state/Auth/action-creators';
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
    const { name, phone1, tagIds, address, website, reviewIds, createdBy, description } = this.props.allPlaces[placeId];
    const tags = tagIds.length ? tagIds.map(tagId => this.props.tagsById[tagId]) : [];
    return this.props.loading && (
      <PlaceCard
          icon={'ios-images-outline'}
          name={name}
          tags={tags}
          phone={phone1}
          address={address}
          website={website}
          description={description}
          reviewCount={reviewIds.length}
          reviewAvg={this.props.reviewAvgsByPlaceId[placeId]}
          createdBy={this.props.usersById[createdBy]}
          onSelect={() => this.showPlaceDetail(placeId)}
      />
    );
  }

  render() {
    const { filterBy, placesById, onResetPlaceFilter, orderPlacesByNameAsc, orderPlacesByNameDes, orderPlacesByReviewAvgAsc, orderPlacesByReviewAvgDsc } = this.props;
    const alph = filterBy.includes('alphabetically') && filterBy.includes('descending');
    const avg = filterBy.includes('rating') && filterBy.includes('descending');
    const alphA = filterBy.includes('alphabetically') && filterBy.includes('ascending');
    const avgA = filterBy.includes('rating') && filterBy.includes('ascending');
    return (
      <View style={styles.viewContainer}>
        <View style={styles.buttonContainer}>
          <Button title="show all" onPress={onResetPlaceFilter} />
          <Button title={`abc ${alphA ? '>' : '<'}`} onPress={alph ? orderPlacesByNameAsc : orderPlacesByNameDes} />
          <Button title={`avg. ${avgA ? '>' : '<'}`} onPress={avg ? orderPlacesByReviewAvgAsc : orderPlacesByReviewAvgDsc} />
          <Button title="search" onPress={this.showSearchDrawer} />
        </View>
        <FlatList
            style={styles.listContainer}
            data={placesById.map(placeId => ({ key: placeId, placeId }))}
            renderItem={this.renderPlaceCard}
        />
      </View>
    );
  }
}


const mapState = (state) => ({
  loading: state.fetch.initialStateLoaded,
  tagsById: state.tags.byId,
  usersById: state.users.byId,
  allPlaces: state.places.byId,
  filterBy: state.root.placeFilter.order,
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


const styles = StyleSheet.create({
  viewContainer: {
    height: '100%'
  },
  listContainer: {
    paddingBottom: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
