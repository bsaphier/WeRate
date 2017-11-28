import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
import { PlaceCard } from './components';



class PlacesTab extends Component {

  renderPlaceCard = ({ item: { placeId } }) => {
    const { name, phone1, address, website, description } = this.props.allPlaces[placeId];
    return (
      <PlaceCard
          key={placeId + 'placeCard'}
          name={name}
          phone={phone1}
          icon={'ios-images-outline'}
          address={address}
          website={website}
          reviewCount={1}
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


const mapState = ({ places: { byId, allIds } }) => ({
  allPlaces: byId,
  placesById: allIds
});


export default connect(mapState)(PlacesTab);


const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55
  }
});
