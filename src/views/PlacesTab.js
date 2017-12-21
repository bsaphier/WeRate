import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { resetPlaceFilter } from '../state/App/action-creators';
import { getFilteredPlaces } from '../state/Places/selectors';
import { PlaceCard } from './components';



class PlacesTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'tab.place.event.new') {
        this.showNewPlaceForm();
      }
    }
  }

  showSearchDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'right'
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
    const { name, phone1, tagIds, address, website, reviewIds, description } = this.props.allPlaces[placeId];
    const tags = tagIds.length ? tagIds.map(tagId => this.props.tagsById[tagId]) : [];
    return (
      <PlaceCard
          key={placeId + 'placeCard'}
          name={name}
          tags={tags}
          phone={phone1}
          icon={'ios-images-outline'}
          address={address}
          website={website}
          reviewCount={reviewIds.length}
          onSelect={() => this.showPlaceDetail(placeId)}
          description={description}
      />
    );
  }

  render() {
    const { placesById, onResetPlaceFilter } = this.props;
    return (
      <View style={styles.viewContainer}>
          <View style={styles.buttonContainer}>
              <Button title="show all" onPress={onResetPlaceFilter} />
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
  tagsById: state.tags.byId,
  allPlaces: state.places.byId,
  placesById: getFilteredPlaces(state),
});


const mapDispatch = dispatch => ({
  onResetPlaceFilter: () => dispatch(resetPlaceFilter())
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
