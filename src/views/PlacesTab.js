import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
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

  showNewPlaceForm = () => {
    this.props.navigator.showModal({
      screen: 'werate.modal.place',
      title: 'Place Modal'
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
    const { name, phone1, tagIds, address, website, description } = this.props.allPlaces[placeId];
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
          reviewCount={1}
          onSelect={() => this.showPlaceDetail(placeId)}
          description={description}
      />
    );
  }

  render() {
    return (
      <View>
          <FlatList
              style={styles.contentContainer}
              data={this.props.placesById.map(placeId => ({ key: placeId, placeId }))}
              renderItem={this.renderPlaceCard}
          />
      </View>
    );
  }
}


const mapState = ({ tags, places: { byId, allIds } }) => ({
  tagsById: tags.byId,
  allPlaces: byId,
  placesById: allIds
});


export default connect(mapState)(PlacesTab);


const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 13,
    height: '100%'
  }
});
