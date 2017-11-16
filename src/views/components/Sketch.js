// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { TouchableHighlight, View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { actionCreators as tagsActionCreators } from '../../state/Tags';
import { actionCreators as placesActionCreators } from '../../state/Places';
import { actionCreators as reviewsActionCreators } from '../../state/Reviews';
import type { tagsTypes } from '../../state/Tags';
import type { placesTypes } from '../../state/Places';
import type { reviewsTypes } from '../../state/Reviews';
type sketchProps = {
  tags: any,
  places: any,
  reviews: any,
  createPlace: any,
  deletePlace: any,
  loadAllTags: any,
  loadAllPlaces: any,
  loadAllReviews: any
};
type sketchState = {
  name: string,
  description: string
};



class Sketch extends Component<sketchProps, sketchState> {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  componentDidMount() {
    this.props.loadAllTags();
    this.props.loadAllPlaces();
    this.props.loadAllReviews();
  }

  updateName(name: string) {
    this.setState({ name });
  }

  updateDescription(description: string) {
    this.setState({ description });
  }

  addPlace() {
    const { name, description } = this.state;
    this.props.createPlace({ name, description })
      .then(() => this.setState({ name: '', description: '' }));
  }

  render() {
    const { name, description } = this.state;
    const { tags, places, reviews, deletePlace } = this.props;
    return (
      <View style={styles.SketchContainter}>
        <Text style={styles.Sketch}>List of Places</Text>
        <View style={styles.InputWrap}>
          <TextInput
              style={styles.Input}
              placeholder={'Add A Place'}
              value={name}
              onChangeText={(text) => this.updateName(text)}
          />
          <TextInput
              style={styles.Input}
              placeholder={'Describe the place'}
              value={description}
              onChangeText={(text) => this.updateDescription(text)}
          />
        </View>
        <FlatList
            data={places.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const place: placesTypes.Place = places.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{place.name}</Text>
                      <Text>{place.description}</Text>
                    </View>
                    <View style={styles.PlaceText}>
                      <Button title="X" onPress={() => deletePlace(place)} />
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
        />
        <Button
            title={'Add Place'}
            disabled={!name.length}
            onPress={() => this.addPlace()}
        />
        <FlatList
            data={tags.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const tag: tagsTypes.Place = tags.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{tag.title}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
        />
        <FlatList
            data={reviews.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const review: reviewsTypes.Place = reviews.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{review.rating}</Text>
                      <Text>{review.comment}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  SketchContainter: {},
  Sketch: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#666'
  },
  InputWrap: {
    display: 'flex',
    alignItems: 'center',
    margin: 13
  },
  Input: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#69F',
    margin: 5
  },
  PlaceWrap: {
    flex: 1,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center'
  },
  PlaceTitle: {
    flex: 8,
    padding: 2,
    flexDirection: 'column'
  },
  PlaceText: {
    flex: 2,
    margin: 2,
    padding: 3
  }
});


const mapState = ({ tags, places, reviews }) => ({ tags, places, reviews });

const mapDispatch = dispatch => ({
  loadAllTags: () => dispatch(tagsActionCreators.loadAllTags()),
  loadAllPlaces: () => dispatch(placesActionCreators.loadAllPlaces()),
  loadAllReviews: () => dispatch(reviewsActionCreators.loadAllReviews()),
  createPlace: (place: placesTypes.Place) => dispatch(placesActionCreators.createPlace(place)),
  deletePlace: (place: placesTypes.Place) => dispatch(placesActionCreators.deletePlace(place))
});


export default connect(mapState, mapDispatch)(Sketch);
