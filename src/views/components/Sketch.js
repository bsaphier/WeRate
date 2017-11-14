// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { actionCreators as placesActionCreators } from '../../state/Places';
import type { placesTypes } from '../../state/Places';


let id = -1;
function createPlace(name = 'A Place'): placesTypes.Place {
  id++;
  return {
    id: ''+id,
    createdBy: '0',
    reviewIds: [],
    categoryIds: [],
    name,
    description: '',
    address: {}
  };
}


const PlaceName = ({ place, remove }) => (
  <View style={styles.PlaceWrap}>
    <Text style={styles.Sketch}>{ place.name }</Text>
    <Button onPress={() => remove(place)} title="x" />
  </View>
);

const Sketch = (props) => (
  <View style={styles.SketchContainter}>
    <Button onPress={() => props.addPlace(createPlace())} title="Add A Place" color="#63F" />
    {
      props.places.allIds.map(
        placeId => {
          const place = props.places.byId[placeId];
          return (<PlaceName key={placeId} remove={props.removePlace} place={place} />);
        }
      )
    }
  </View>
);


const styles = StyleSheet.create({
  SketchContainter: {
    display: 'flex',
    alignItems: 'center',
  },
  Sketch: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666'
  },
  PlaceWrap: {
    flexDirection: 'row'
  }
});


const mapState = ({ places, reviews, categories }) => ({
  places,
  reviews,
  categories
});

const mapDispatch = dispatch => ({
  addPlace: (place: placesTypes.Place) => dispatch(placesActionCreators.addPlace(place)),
  removePlace: (place: placesTypes.Place) => dispatch(placesActionCreators.removePlace(place))
});


export default connect(mapState, mapDispatch)(Sketch);
